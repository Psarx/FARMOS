# import os

# class Config:
#     # Use your PostgreSQL connection string
#     SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:admin@localhost:5432/FARMOS'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://neondb_owner:npg_YwgohXM48xZD@ep-round-lake-ahwn1rs3-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SECRET_KEY = 'SALT'  # Replace with a secure key for sessions
