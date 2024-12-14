from flask import request, jsonify
from app import app, db
from app.models import CropData

@app.route('/get_data', methods=['GET'])
def get_data():
    crops = CropData.query.all()
    return jsonify([{
        'nitrogen': crop.nitrogen,
        'phosphorus': crop.phosphorus,
        'potassium': crop.potassium,
        'temperature': crop.temperature,
        'humidity': crop.humidity,
        'ph': crop.ph,
        'rainfall': crop.rainfall,
        'crop': crop.crop
    } for crop in crops])

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    # Implement your prediction logic here
    return jsonify({'recommendation': 'Your recommended crop'})