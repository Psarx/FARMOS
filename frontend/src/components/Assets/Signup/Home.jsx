import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import bgvideo from '../videos/homevideo.mp4';

const Home = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        alert('Logged Out Successfully!');
        navigate('/Signup');
    };
    
    const handleCropPrediction = () => {
        navigate('/crop-prediction');
    };
    
    const handleDiseaseDetection = () => {
        window.location.href = 'http://localhost:8501';
    };
    
    return (
        <div className="page-container">
            <div className="background-overlay">
            <video autoPlay muted loop className="background-video">
                <source src="/homevideo.mp4" type="video/mp4" />
            </video>
            </div>
            
            {/* Plant decorations */}
            <div className="plant-decoration" style={{ top: '10%', left: '5%' }}>🌱</div>
            <div className="plant-decoration" style={{ bottom: '15%', right: '8%' }}>🌿</div>
            <div className="plant-decoration" style={{ top: '20%', right: '10%' }}>🍃</div>
            
            <button className="home-button" onClick={handleLogout}>
                <span className="button-icon">➤</span> Logout
            </button>
            
            <div className="content-container">
                <div className="branding-container">
                    <h1 className="branding-title">Farm<span className="brand-highlight">OS</span></h1>
                    <div className="branding-title-underline" style={{ width: '80px' }}></div>
                    <h2 className="branding-subtitle">Smart Agriculture Solutions</h2>
                    <p className="branding-description">
                        Empowering farmers with intelligent data-driven insights for sustainable and efficient farming practices.
                    </p>
                    <div className="branding-icons">
                        <span className="icon-large">🌾</span>
                        <span className="icon-large">🌱</span>
                        <span className="icon-large">🌿</span>
                    </div>
                </div>
                
                <div className="form-container">
                    <h1 className="header">Welcome to FarmOS</h1>
                    <p className="sub-header">Choose one of the following options:</p>
                    
                    <div className="form">
                        <button 
                            className="submit-button crop-button"
                            onClick={handleCropPrediction}
                        >
                            <span className="button-icon">🌾</span> Crop Prediction
                        </button>
                        
                        <button 
                            className="submit-button disease-button"
                            onClick={handleDiseaseDetection}
                        >
                            <span className="button-icon">🔍</span> Disease Detection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;