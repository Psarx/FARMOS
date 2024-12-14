import joblib
import numpy as np

def predict_crop(features):
    model = joblib.load('saved_models/crop_model.pkl')
    prediction