# import os

# class Config:
#     # Use your PostgreSQL connection string
#     SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:admin@localhost:5432/FARMOS'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://MainProject_owner:Q89rbOjImFDi@ep-rough-water-a5q7g77n.us-east-2.aws.neon.tech/MainProject?sslmode=require'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SECRET_KEY = 'SALT'  # Replace with a secure key for sessions
