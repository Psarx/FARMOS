from flask import Blueprint, request, jsonify, send_from_directory, session
from flask_cors import CORS
import bcrypt
import joblib
import numpy as np
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User
# from app import app  # Remove this line as it's not necessary anymore

# Create a Blueprint
auth_routes = Blueprint('auth', __name__)
CORS(auth_routes, origins=["http://localhost:5000"])

# Load the trained model, label encoder, and scaler
model = joblib.load('models/saved_models/crop_recommendation_model.pkl')
label_encoder = joblib.load('models/saved_models/label_encoder.pkl')
scaler = joblib.load('models/saved_models/scaler.pkl')

# Your existing routes go here...


@auth_routes.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask App!", 200

@auth_routes.route('/favicon.ico')
def favicon():
    return send_from_directory(auth_routes.static_folder, 'favicon.ico', mimetype='image/vnd.microsoft.icon')

# User Registration
@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # logging.debug(f"Received data: {data}")
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    # Check if user exists
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"message": "User already exists"}), 409

    # Create user
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

    # logging.debug(f"Received data: {hashed_password}")
    new_user = User(username=username, email=email, password_hash=hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registration successful!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while registering the user."}), 500



# User Login
@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # logging.debug(f"Received data: {data}")
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check the password by directly comparing the entered password with the stored hash
    if bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        # Save user info in session
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({"message": "Login successful", "user": {"id": user.id, "username": user.username}}), 200

    else:
        return jsonify({"message": "Invalid credentials"}), 401


# User Logout
@auth_routes.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

# Crop Recommendation
@auth_routes.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Get JSON data from the request

    try:
        # Extract soil and environmental features
        features = np.array([[
            data['N'], data['P'], data['K'],
            data['temperature'], data['humidity'],
            data['ph'], data['rainfall']
        ]])

        # Normalize the features using the scaler
        features_scaled = scaler.transform(features)

        # Make the prediction
        prediction = model.predict(features_scaled)

        # Decode the prediction (crop label)
        crop = label_encoder.inverse_transform(prediction)

        return jsonify({'recommended_crop': crop[0]}), 200
    except KeyError as e:
        return jsonify({"message": f"Missing parameter: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred during prediction", "error": str(e)}), 500