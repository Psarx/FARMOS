import pandas as pd
from app import db
from app.models import CropData
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load data from the database
data = pd.read_sql(CropData.query.statement, db.session.bind)

# Preprocess data
X_train, X_test, y_train, y_test = preprocess_data(data)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'saved_models/crop_model.pkl')