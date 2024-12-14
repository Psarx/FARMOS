import sys
import os

# Add the app directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

from app import db
from app.models import CropData

# Create the database and tables
db.create_all()

# Optionally, add initial data
def add_initial_data():
    initial_data = [
        CropData(nitrogen=90, phosphorus=42, potassium=43, temperature=20.8, humidity=82, ph=6.5, rainfall=202, crop='Rice'),
        CropData(nitrogen=50, phosphorus=30, potassium=20, temperature=22.0, humidity=75, ph=6.0, rainfall=150, crop='Wheat'),
        CropData(nitrogen=70, phosphorus=40, potassium=30, temperature=18.5, humidity=80, ph=6.2, rainfall=180, crop='Corn'),
    ]

    for crop_data in initial_data:
        db.session.add(crop_data)

    db.session.commit()

# Uncomment the following line to add initial data
# add_initial_data()