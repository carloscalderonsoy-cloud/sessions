from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    artist_type: str = Field(..., min_length=2, max_length=50)
    message: Optional[str] = Field(None, max_length=1000)
    package_interest: Optional[str] = Field(None, max_length=50)

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    email: str
    phone: Optional[str]
    artist_type: str
    message: Optional[str]
    package_interest: Optional[str]
    created_at: str
    status: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Lumo Entretenimiento API - Bienvenido"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form Endpoint
@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(contact: ContactCreate):
    """Submit a contact form for artist application"""
    try:
        contact_id = str(uuid.uuid4())
        created_at = datetime.now(timezone.utc).isoformat()
        
        contact_doc = {
            "id": contact_id,
            "name": contact.name,
            "email": contact.email,
            "phone": contact.phone,
            "artist_type": contact.artist_type,
            "message": contact.message,
            "package_interest": contact.package_interest,
            "created_at": created_at,
            "status": "pending"
        }
        
        await db.contacts.insert_one(contact_doc)
        
        # Return without _id
        return ContactResponse(
            id=contact_id,
            name=contact.name,
            email=contact.email,
            phone=contact.phone,
            artist_type=contact.artist_type,
            message=contact.message,
            package_interest=contact.package_interest,
            created_at=created_at,
            status="pending"
        )
    except Exception as e:
        logging.error(f"Error creating contact: {e}")
        raise HTTPException(status_code=500, detail="Error al enviar el formulario")

@api_router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts():
    """Get all contact submissions"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Lumo Entretenimiento API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
