import os
import pandas as pd
import requests
from dotenv import load_dotenv
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load Hugging Face API Key from .env file
load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct"
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

def preprocess_data(data):
    """
    Prepares the dataset for training by scaling numerical features.
    Returns training and testing sets along with the fitted scaler.
    """
    X = data[['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall']]
    y = data['crop']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    return X_train, X_test, y_train, y_test, scaler  # Returning scaler for future use

def generate_farming_guide(crop, soil_data):
    """
    Uses Hugging Face Mistral API to generate a step-by-step farming guide.
    """
    prompt = f"Generate a beginner-friendly guide for growing {crop}. Soil details: {soil_data}. Include soil preparation, planting, watering, fertilization, and harvesting instructions."
    
    payload = {"inputs": prompt}
    response = requests.post(HF_API_URL, headers=HEADERS, json=payload)
    
    if response.status_code == 200:
        return response.json()[0]["generated_text"]
    else:
        return f"Error: {response.json()}"
