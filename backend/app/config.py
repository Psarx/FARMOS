import os

class Config:
    # Use your PostgreSQL connection string
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:admin@localhost:5432/FARMOS'
    SQLALCHEMY_TRACK_MODIFICATIONS = False