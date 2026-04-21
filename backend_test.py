#!/usr/bin/env python3
"""
Backend API Testing for Lumo Entretenimiento Landing Page
Tests health check and contact form endpoints
"""

import requests
import sys
import json
from datetime import datetime

class LumoAPITester:
    def __init__(self, base_url="https://lumo-studio-launch.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_health_check(self):
        """Test GET /api/health endpoint"""
        try:
            response = requests.get(f"{self.api_url}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy" and "Lumo Entretenimiento" in data.get("service", ""):
                    self.log_test("Health Check", True, f"Response: {data}")
                    return True
                else:
                    self.log_test("Health Check", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False

    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        test_data = {
            "name": "Test Artist",
            "email": "test@example.com",
            "phone": "+52 33 1234 5678",
            "artist_type": "solista",
            "message": "Interested in music production services",
            "package_interest": "emergentes"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact", 
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "email", "artist_type", "created_at", "status"]
                
                if all(field in data for field in required_fields):
                    if data["name"] == test_data["name"] and data["email"] == test_data["email"]:
                        self.log_test("Contact Form - Valid Data", True, f"Contact created with ID: {data['id']}")
                        return True
                    else:
                        self.log_test("Contact Form - Valid Data", False, "Response data doesn't match input")
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Contact Form - Valid Data", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_test("Contact Form - Valid Data", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form - Valid Data", False, f"Exception: {str(e)}")
            return False

    def test_contact_form_invalid(self):
        """Test POST /api/contact with invalid data"""
        test_data = {
            "name": "",  # Invalid: empty name
            "email": "invalid-email",  # Invalid: bad email format
            "artist_type": ""  # Invalid: empty required field
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact", 
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error or 400 for bad request
            if response.status_code in [400, 422]:
                self.log_test("Contact Form - Invalid Data", True, f"Correctly rejected invalid data with status {response.status_code}")
                return True
            else:
                self.log_test("Contact Form - Invalid Data", False, f"Should reject invalid data but got status {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Data", False, f"Exception: {str(e)}")
            return False

    def test_contact_form_minimal(self):
        """Test POST /api/contact with minimal required data"""
        test_data = {
            "name": "Minimal Test",
            "email": "minimal@test.com",
            "artist_type": "banda"
            # Optional fields omitted
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact", 
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data["name"] == test_data["name"] and data["email"] == test_data["email"]:
                    self.log_test("Contact Form - Minimal Data", True, f"Contact created with minimal data")
                    return True
                else:
                    self.log_test("Contact Form - Minimal Data", False, "Response data doesn't match input")
                    return False
            else:
                self.log_test("Contact Form - Minimal Data", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form - Minimal Data", False, f"Exception: {str(e)}")
            return False

    def test_api_root(self):
        """Test GET /api/ root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "Lumo Entretenimiento" in data.get("message", ""):
                    self.log_test("API Root", True, f"Response: {data}")
                    return True
                else:
                    self.log_test("API Root", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("API Root", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("API Root", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting Lumo Entretenimiento API Tests")
        print(f"📡 Testing API at: {self.api_url}")
        print("=" * 60)
        
        # Run tests
        self.test_api_root()
        self.test_health_check()
        self.test_contact_form_valid()
        self.test_contact_form_minimal()
        self.test_contact_form_invalid()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests PASSED!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests FAILED")
            return False

def main():
    tester = LumoAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open("/app/backend_test_results.json", "w") as f:
        json.dump({
            "summary": {
                "total_tests": tester.tests_run,
                "passed_tests": tester.tests_passed,
                "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%",
                "timestamp": datetime.now().isoformat()
            },
            "test_results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())