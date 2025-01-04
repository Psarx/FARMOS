import React, { useState } from 'react';
import './CropPrediction.css';
import wheatImage from '../../Assets/Images/wheat.jpg';

const CropPrediction = () => {
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
        location: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Predicting'); // Alert when the button is clicked
        console.log('Submitted Data:', formData);

        // Simulate an API call or database update
        alert('Crop Prediction data submitted successfully!');
    };

    return (
        <div className="container">
            <div className="main-container">
                <div className="left-section">
                    <div className="header">
                        <div className="text">Crop Prediction</div>
                        <div className="underline"></div>
                    </div>
                    <form className="inputs" onSubmit={handleSubmit}>
                        {Object.keys(formData).map((key) => (
                            <div key={key} className="input">
                                <input
                                    type="text"
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                        <div className="submit-container">
                            <button type="submit" className="submit">
                                Predict Crop
                            </button>
                        </div>
                    </form>
                </div>
                <div className="right-panel">
                    <img src={wheatImage} alt="Wheat background" className="background-image" />
                </div>
            </div>
        </div>
    );
};

export default CropPrediction;
