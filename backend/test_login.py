#!/usr/bin/env python
"""Test login functionality"""
import requests
import json

BASE_URL = "http://localhost:5001/api/auth"

def test_login(email, password):
    """Test login endpoint"""
    print(f"\n{'='*50}")
    print(f"Testing login: {email}")
    print(f"{'='*50}")
    
    url = f"{BASE_URL}/login"
    data = {"email": email, "password": password}
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except requests.exceptions.ConnectionError:
        print("ERROR: Cannot connect to server. Is it running?")
        return False
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return False

def test_register(username, email, password):
    """Test register endpoint"""
    print(f"\n{'='*50}")
    print(f"Testing registration: {username} / {email}")
    print(f"{'='*50}")
    
    url = f"{BASE_URL}/register"
    data = {"username": username, "email": email, "password": password}
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 201
    except requests.exceptions.ConnectionError:
        print("ERROR: Cannot connect to server. Is it running?")
        return False
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    # Test with the user we created in database
    test_login("test@example.com", "test123")
    
    # Test with an existing user (change these if needed)
    test_login("ann123@gmail.com", "123")
    
    # Test registration
    test_register("testuser2026", "testuser2026@example.com", "testpass123")
    
    # Test login with newly registered user
    test_login("testuser2026@example.com", "testpass123")
