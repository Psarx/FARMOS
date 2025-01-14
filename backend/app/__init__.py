from flask import Flask

# Initialize the Flask app
app = Flask(__name__)

# Import routes AFTER initializing the app
from app import routes
