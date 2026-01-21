from flask import Blueprint, request, jsonify, send_from_directory, session, current_app
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import bcrypt
import joblib
import pandas as pd
import os
import requests
from dotenv import load_dotenv
from .models import User, db, Crop  # Import the Crop model

auth_routes = Blueprint("auth_routes", __name__)
CORS(auth_routes, origins=["http://localhost:3000", "http://localhost:5000"])

# Load Hugging Face API Key from .env
load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"

HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

# Get the base directory of the backend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load the trained model, label encoder, and scaler
model = joblib.load(os.path.join(BASE_DIR, 'models/saved_models/crop_recommendation_model.pkl'))
label_encoder = joblib.load(os.path.join(BASE_DIR, 'models/saved_models/label_encoder.pkl'))
scaler = joblib.load(os.path.join(BASE_DIR, 'models/saved_models/scaler.pkl'))

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
    current_app.logger.debug(f"Received registration data: {data}")

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    try:
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        current_app.logger.debug(f"User {username} registered successfully.")
        return jsonify({"message": "Registration successful!"}), 201

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error during registration: {str(e)}")
        return jsonify({"message": "An error occurred while registering the user."}), 500

# User Login
@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check if password hash is bcrypt format (starts with $2a$, $2b$, $2y$)
    is_valid = False
    if user.password_hash and user.password_hash.startswith('$2'):
        # Use bcrypt for verification
        try:
            is_valid = bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8'))
        except Exception as e:
            current_app.logger.error(f"Bcrypt verification error: {str(e)}")
            is_valid = False
    else:
        # Use werkzeug for verification (for newly registered users)
        is_valid = check_password_hash(user.password_hash, password)
    
    if is_valid:
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

# Crop Recommendation + AI Roadmap Generation
@auth_routes.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        input_data = pd.DataFrame([[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]],
                                  columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

        features_scaled = scaler.transform(input_data)
        prediction = model.predict(features_scaled)
        recommended_crop = label_encoder.inverse_transform(prediction)[0]

        # Generate AI Roadmap
        farming_guide = generate_farming_guide(recommended_crop, data)

        return jsonify({
            'recommended_crop': recommended_crop,
            'farming_guide': farming_guide
        }), 200

    except KeyError as e:
        return jsonify({"message": f"Missing parameter: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred during prediction", "error": str(e)}), 500

# Generate Farming Guide using Mistral AI
def generate_farming_guide(crop, soil_data):
    prompt = f"""
    I am a beginner farmer looking to grow {crop}. My soil conditions are:
    - Nitrogen: {soil_data['N']} mg/kg
    - Phosphorus: {soil_data['P']} mg/kg
    - Potassium: {soil_data['K']} mg/kg
    - Temperature: {soil_data['temperature']}°C
    - Humidity: {soil_data['humidity']}%
    - pH: {soil_data['ph']}
    - Rainfall: {soil_data['rainfall']} mm

    Can you provide a **clear, step-by-step** guide to growing {crop} successfully?  
    Please include:
    - Soil preparation  
    - Planting methods  
    - Watering schedule  
    - Fertilization guide  
    - Pest control  
    - Harvesting techniques  
    - Storage and market value  

    Please respond **directly with the guide**, without repeating this prompt.  
    """

    payload = {"inputs": prompt}
    response = requests.post(HF_API_URL, headers=HEADERS, json=payload)

    if response.status_code == 200:
        return response.json()[0]['generated_text']
    else:
        return f"Error: {response.json()}"
    
# Add Crop to Database
@auth_routes.route('/add_crop', methods=['POST'])
def add_crop():
    data = request.get_json()

    name = data.get('name')
    description = data.get('description')

    if not name or not description:
        return jsonify({"message": "Crop name and description are required"}), 400

    existing_crop = Crop.query.filter_by(name=name).first()
    if existing_crop:
        return jsonify({"message": "Crop already exists"}), 409

    try:
        new_crop = Crop(name=name, description=description)
        db.session.add(new_crop)
        db.session.commit()
        return jsonify({"message": "Crop added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while adding the crop", "error": str(e)}), 500

# Get Crop Details
@auth_routes.route('/get_crop/<string:name>', methods=['GET'])
def get_crop(name):
    try:
        crop = Crop.query.filter_by(name=name).first()
        if not crop:
            return jsonify({"message": "Crop not found"}), 404

        return jsonify({
            "name": crop.name,
            "description": crop.description
        }), 200

    except Exception as e:
        return jsonify({"message": "An error occurred while fetching the crop details", "error": str(e)}), 500
