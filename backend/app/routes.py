from flask import Blueprint, request, jsonify, send_from_directory, session, current_app
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import joblib
import pandas as pd
from .models import User, db

auth_routes = Blueprint("auth_routes", __name__)
CORS(auth_routes, origins=["http://localhost:5000"])

# Load the trained model, label encoder, and scaler
model = joblib.load('models/saved_models/crop_recommendation_model.pkl')
label_encoder = joblib.load('models/saved_models/label_encoder.pkl')
scaler = joblib.load('models/saved_models/scaler.pkl')

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

    if check_password_hash(user.password_hash, password):
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
    data = request.json
    try:
        input_data = pd.DataFrame([[
            data['N'], data['P'], data['K'],
            data['temperature'], data['humidity'],
            data['ph'], data['rainfall']
        ]], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

        features_scaled = scaler.transform(input_data)
        prediction = model.predict(features_scaled)
        crop = label_encoder.inverse_transform(prediction)

        return jsonify({'recommended_crop': crop[0]}), 200
    except KeyError as e:
        return jsonify({"message": f"Missing parameter: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred during prediction", "error": str(e)}), 500
