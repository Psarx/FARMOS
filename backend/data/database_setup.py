from app import app, db
from app.models import CropData  # Adjust the import based on your project structure

def create_database():
    with app.app_context():  # Create an application context
        db.create_all()  # This will create all tables defined in your models
        print("Database tables created successfully.")

if __name__ == "__main__":
    create_database()