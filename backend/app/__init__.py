from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Set the secret key from the .env file
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback_secret_key')  # Fallback key if not found

    # Enable CORS
    CORS(app, origins=[os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:5000')])

    # Database Configuration from .env
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://MainProject_owner:Q89rbOjImFDi@ep-rough-water-a5q7g77n.us-east-2.aws.neon.tech/MainProject?sslmode=require'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # JWT Secret and Salt Rounds for hashing (Optional, if used in your app)
    app.config['JWT_SECRET'] = os.getenv('JWT_SECRET')
    app.config['SALT_ROUNDS'] = int(os.getenv('SALT_ROUNDS', 10))  # Default to 10 if not found

    db.init_app(app)

    # Import and register routes
    from .routes import auth_routes
    # app.register_blueprint(auth_routes)
    app.register_blueprint(auth_routes, url_prefix="/api/auth")

    return app
