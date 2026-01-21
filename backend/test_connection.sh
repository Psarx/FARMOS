#!/bin/bash
# Test frontend-backend connection

echo "=========================================="
echo "Testing Backend Connection"
echo "=========================================="

# Test if backend is running
echo ""
echo "1. Testing Backend Health Check..."
curl -s http://localhost:5001/api/auth/ && echo " ✓ Backend responding" || echo " ✗ Backend not responding"

echo ""
echo "2. Testing Login Endpoint..."
curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"test@example.com","password":"test123"}' | python3 -m json.tool 2>/dev/null || echo "Login test completed (check status above)"

echo ""
echo "3. Testing Registration Endpoint..."
curl -s -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"username":"conn_test","email":"conntest@test.com","password":"test123"}' | python3 -m json.tool 2>/dev/null

echo ""
echo "4. Testing CORS Preflight..."
curl -s -I -X OPTIONS http://localhost:5001/api/auth/login \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" | grep -i "access-control" && echo " ✓ CORS enabled" || echo " ✗ CORS issue"

echo ""
echo "=========================================="
echo "Test Complete"
echo "=========================================="
