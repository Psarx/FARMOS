import os
import pandas as pd
import requests
from flask import current_app
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load Hugging Face API Key from .env file
load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL = "Qwen/Qwen2.5-72B-Instruct"
hf_client = InferenceClient(token=HF_API_KEY)

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
    
    try:
        response = hf_client.chat_completion(
            model=HF_MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1024,
        )
        return response.choices[0].message.content
    except Exception as e:
        current_app.logger.error(f"HF API error: {e}", exc_info=True)
        return f"Error generating farming guide: {str(e)}"
