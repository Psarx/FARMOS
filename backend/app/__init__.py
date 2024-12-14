from flask import Flask

# Initialize Flask app
app = Flask(__name__)

# Import routes after app initialization
from app import routes
