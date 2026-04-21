"""
Lumo Entretenimiento API Tests
Tests for: /api/health, /api/contact, /api/contacts endpoints
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoint:
    """Health check endpoint tests"""
    
    def test_health_check_returns_200(self):
        """Test that health endpoint returns 200 OK"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "service" in data
        print(f"✓ Health check passed: {data}")

class TestContactEndpoint:
    """Contact form submission tests"""
    
    def test_create_contact_success(self):
        """Test successful contact form submission"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test Artist",
            "email": unique_email,
            "phone": "+52 33 1234 5678",
            "artist_type": "solista",
            "message": "Interested in music production services",
            "package_interest": "emergentes"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["artist_type"] == payload["artist_type"]
        assert data["status"] == "pending"
        assert "id" in data
        assert "created_at" in data
        print(f"✓ Contact created successfully: {data['id']}")
        
        return data["id"]
    
    def test_create_contact_minimal_fields(self):
        """Test contact submission with only required fields"""
        unique_email = f"minimal_{uuid.uuid4().hex[:8]}@test.com"
        payload = {
            "name": "Minimal Test",
            "email": unique_email,
            "artist_type": "banda"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["artist_type"] == payload["artist_type"]
        assert data["phone"] is None
        assert data["message"] is None
        print(f"✓ Minimal contact created: {data['id']}")
    
    def test_create_contact_missing_name(self):
        """Test contact submission fails without name"""
        payload = {
            "email": "test@example.com",
            "artist_type": "solista"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Validation correctly rejects missing name")
    
    def test_create_contact_missing_email(self):
        """Test contact submission fails without email"""
        payload = {
            "name": "Test Artist",
            "artist_type": "solista"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Validation correctly rejects missing email")
    
    def test_create_contact_missing_artist_type(self):
        """Test contact submission fails without artist_type"""
        payload = {
            "name": "Test Artist",
            "email": "test@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Validation correctly rejects missing artist_type")
    
    def test_create_contact_all_package_types(self):
        """Test contact submission with different package interests"""
        packages = ["emergentes", "establecidos", "completo", "personalizado"]
        
        for pkg in packages:
            unique_email = f"pkg_{pkg}_{uuid.uuid4().hex[:6]}@test.com"
            payload = {
                "name": f"Test {pkg}",
                "email": unique_email,
                "artist_type": "solista",
                "package_interest": pkg
            }
            
            response = requests.post(f"{BASE_URL}/api/contact", json=payload)
            assert response.status_code == 200
            data = response.json()
            assert data["package_interest"] == pkg
            print(f"✓ Package type '{pkg}' accepted")

class TestContactsListEndpoint:
    """Get contacts list endpoint tests"""
    
    def test_get_contacts_returns_list(self):
        """Test that contacts endpoint returns a list"""
        response = requests.get(f"{BASE_URL}/api/contacts")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Contacts list returned: {len(data)} contacts")
    
    def test_get_contacts_structure(self):
        """Test that contacts have correct structure"""
        response = requests.get(f"{BASE_URL}/api/contacts")
        assert response.status_code == 200
        
        data = response.json()
        if len(data) > 0:
            contact = data[0]
            required_fields = ["id", "name", "email", "artist_type", "created_at", "status"]
            for field in required_fields:
                assert field in contact, f"Missing field: {field}"
            print(f"✓ Contact structure validated")
        else:
            print("⚠ No contacts to validate structure")

class TestRootEndpoint:
    """Root API endpoint tests"""
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ Root endpoint: {data['message']}")

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
