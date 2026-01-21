from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

from sqlalchemy import text  # Import text from sqlalchemy
# Load environment variables from .env file
load_dotenv()

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    # Set the secret key from the .env file
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback_secret_key')  # Fallback key if not found

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Database Configuration from .env
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://MainProject_owner:Q89rbOjImFDi@ep-rough-water-a5q7g77n.us-east-2.aws.neon.tech/MainProject?sslmode=require'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Connection pool settings to handle Neon's serverless nature
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_size': 10,              # Number of connections to keep open
        'pool_recycle': 300,          # Recycle connections after 5 minutes
        'pool_pre_ping': True,        # Test connections before using them
        'max_overflow': 20,           # Maximum overflow connections
        'pool_timeout': 30,           # Timeout for getting a connection
        'connect_args': {
            'connect_timeout': 10,    # Connection timeout
            'keepalives': 1,
            'keepalives_idle': 30,
            'keepalives_interval': 10,
            'keepalives_count': 5,
        }
    }

    # JWT Secret and Salt Rounds for hashing (Optional, if used in your app)
    app.config['JWT_SECRET'] = os.getenv('JWT_SECRET')
    app.config['SALT_ROUNDS'] = int(os.getenv('SALT_ROUNDS', 10))  # Default to 10 if not found

    db.init_app(app)

    # Check if the DB is connected successfully
    try:
        with app.app_context():
            db.session.execute(text('SELECT 1'))  # Correctly declare the query using text()
        print("Database connection successful!")
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise e  # Re-raise the exception to stop app initialization in case of failure

    # Import and register routes
    from .routes import auth_routes
    app.register_blueprint(auth_routes, url_prefix="/api/auth")

    return app

# Initialize the Flask app
app = Flask(__name__)

# Import routes AFTER initializing the app
from app import routes
