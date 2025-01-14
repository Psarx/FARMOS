from app import app
from flask import request, jsonify
import joblib
import numpy as np

# Load the trained model, label encoder, and scaler
model = joblib.load('models/saved_models/crop_recommendation_model.pkl')
label_encoder = joblib.load('models/saved_models/label_encoder.pkl')
scaler = joblib.load('models/saved_models/scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Get JSON data from the request

    # Extract soil and environmental features
    features = np.array([
        data['N'], data['P'], data['K'],
        data['temperature'], data['humidity'],
        data['ph'], data['rainfall']
    ]).reshape(1, -1)

    # Normalize the features using the scaler
    features_scaled = scaler.transform(features)

    # Make the prediction
    prediction = model.predict(features_scaled)

    # Decode the prediction (crop label)
    crop = label_encoder.inverse_transform(prediction)

    return jsonify({'recommended_crop': crop[0]})
