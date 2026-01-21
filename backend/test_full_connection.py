#!/usr/bin/env python3
"""
Frontend-Backend Connection Test
Tests the connection between React frontend and Flask backend
"""

import requests
import json
import time

BACKEND_URL = "http://localhost:5001/api/auth"
FRONTEND_URL = "http://localhost:5000"

# Test credentials
TEST_CREDENTIALS = {
    "email": "demo@farmos.com",
    "password": "demo123"
}

def print_header(text):
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60)

def test_backend_running():
    print_header("1. Testing Backend Server")
    try:
        response = requests.get(f"{BACKEND_URL}/", timeout=3)
        print(f"✓ Backend is responding on port 5001")
        print(f"  Status: {response.status_code}")
        print(f"  Response: {response.text}")
        return True
    except requests.exceptions.ConnectionError:
        print("✗ Backend is NOT running on port 5001")
        print("  Please start: cd backend && python run.py")
        return False
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

def test_frontend_running():
    print_header("2. Testing Frontend Server")
    try:
        response = requests.get(FRONTEND_URL, timeout=3)
        print(f"✓ Frontend is responding on port 5000")
        print(f"  Status: {response.status_code}")
        return True
    except requests.exceptions.ConnectionError:
        print("✗ Frontend is NOT running on port 5000")
        print("  Please start: cd frontend && npm start")
        return False
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

def test_cors():
    print_header("3. Testing CORS Configuration")
    headers = {
        "Origin": FRONTEND_URL,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type"
    }
    try:
        response = requests.options(f"{BACKEND_URL}/login", headers=headers, timeout=3)
        print(f"  Preflight Status: {response.status_code}")
        
        if "Access-Control-Allow-Origin" in response.headers:
            print(f"✓ CORS is properly configured")
            print(f"  Allow-Origin: {response.headers.get('Access-Control-Allow-Origin')}")
            print(f"  Allow-Methods: {response.headers.get('Access-Control-Allow-Methods', 'N/A')}")
            return True
        else:
            print("✗ CORS headers not found")
            return False
    except Exception as e:
        print(f"✗ CORS test failed: {str(e)}")
        return False

def test_login():
    print_header("4. Testing Login Endpoint")
    headers = {
        "Content-Type": "application/json",
        "Origin": FRONTEND_URL
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/login",
            json=TEST_CREDENTIALS,
            headers=headers,
            timeout=5
        )
        
        print(f"  Status Code: {response.status_code}")
        print(f"  Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("✓ Login successful!")
            return True
        elif response.status_code == 404:
            print("! User not found in database")
            print("  Try registering first or use correct credentials")
            return False
        elif response.status_code == 401:
            print("! Invalid credentials")
            return False
        else:
            print(f"✗ Login failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Login test failed: {str(e)}")
        return False

def test_register():
    print_header("5. Testing Registration Endpoint")
    
    test_user = {
        "username": f"testuser_{int(time.time())}",
        "email": f"test_{int(time.time())}@farmos.com",
        "password": "test123"
    }
    
    headers = {
        "Content-Type": "application/json",
        "Origin": FRONTEND_URL
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/register",
            json=test_user,
            headers=headers,
            timeout=5
        )
        
        print(f"  Status Code: {response.status_code}")
        print(f"  Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            print("✓ Registration successful!")
            print(f"\n  New test credentials:")
            print(f"    Email: {test_user['email']}")
            print(f"    Password: {test_user['password']}")
            return True
        elif response.status_code == 409:
            print("! User already exists")
            return False
        else:
            print(f"✗ Registration failed")
            return False
    except Exception as e:
        print(f"✗ Registration test failed: {str(e)}")
        return False

def main():
    print("\n" + "█"*60)
    print("  FARMOS - Frontend/Backend Connection Test")
    print("█"*60)
    
    backend_ok = test_backend_running()
    frontend_ok = test_frontend_running()
    
    if not backend_ok:
        print("\n⚠️  Backend is not running. Please start it first.")
        print("   Command: cd backend && python run.py")
        return
    
    cors_ok = test_cors()
    login_ok = test_login()
    register_ok = test_register()
    
    print_header("SUMMARY")
    print(f"  Backend Server:    {'✓ Running' if backend_ok else '✗ Not Running'}")
    print(f"  Frontend Server:   {'✓ Running' if frontend_ok else '✗ Not Running'}")
    print(f"  CORS Configuration: {'✓ Working' if cors_ok else '✗ Failed'}")
    print(f"  Login Endpoint:    {'✓ Working' if login_ok else '✗ Failed'}")
    print(f"  Register Endpoint: {'✓ Working' if register_ok else '✗ Failed'}")
    
    print("\n" + "="*60)
    print("  TEST CREDENTIALS FOR LOGIN:")
    print("="*60)
    print(f"  Email:    {TEST_CREDENTIALS['email']}")
    print(f"  Password: {TEST_CREDENTIALS['password']}")
    print("="*60 + "\n")
    
    if backend_ok and login_ok:
        print("✓ All systems operational! You can now login from the frontend.")
    else:
        print("⚠️  Some tests failed. Check the output above for details.")

if __name__ == "__main__":
    main()
