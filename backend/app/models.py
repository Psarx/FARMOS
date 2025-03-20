# from app import db  # Adjust the import based on your project structure

# class CropData(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     nitrogen = db.Column(db.Float, nullable=False)
#     phosphorus = db.Column(db.Float, nullable=False)
#     potassium = db.Column(db.Float, nullable=False)
#     temperature = db.Column(db.Float, nullable=False)
#     humidity = db.Column(db.Float, nullable=False)
#     ph = db.Column(db.Float, nullable=False)
#     rainfall = db.Column(db.Float, nullable=False)
#     crop = db.Column(db.String(50), nullable=False)

#     def __repr__(self):
#         return f'<CropData {self.crop}>'

from . import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    last_login = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)



# SoilData Model
class SoilData(db.Model):
    __tablename__ = 'soil_data'
    id = db.Column(db.Integer, primary_key=True)
    nitrogen = db.Column(db.Float, nullable=True)
    phosphorus = db.Column(db.Float, nullable=True)
    potassium = db.Column(db.Float, nullable=True)
    temperature = db.Column(db.Float, nullable=True)
    humidity = db.Column(db.Float, nullable=True)
    ph = db.Column(db.Float, nullable=True)
    rainfall = db.Column(db.Float, nullable=True)
    location = db.Column(db.String(30), nullable=True)

# DiseasePredictions Model
class DiseasePrediction(db.Model):
    __tablename__ = 'disease_predictions'
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(100), nullable=True)
    prediction_date = db.Column(db.Date, nullable=True)
    severity = db.Column(db.String(50), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    user = db.relationship('User', backref=db.backref('disease_predictions', lazy=True))

# UserCropRecommendations Model
class UserCropRecommendation(db.Model):
    __tablename__ = 'user_crop_recommendations'
    id = db.Column(db.Integer, primary_key=True)
    recommended_crop = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    soil_id = db.Column(db.Integer, db.ForeignKey('soil_data.id'), nullable=False)
    recommended_date = db.Column(db.Date, nullable=True)

    # Relationships
    user = db.relationship('User', backref=db.backref('crop_recommendations', lazy=True))
    soil_data = db.relationship('SoilData', backref=db.backref('crop_recommendations', lazy=True))


class Crop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.JSON, nullable=False)  # Store description as JSON


