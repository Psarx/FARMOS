import bcrypt

# Password to hash
password = "abcd"

# Generate bcrypt hash
hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# Print the bcrypt hash
print(hashed_password.decode('utf-8'))
