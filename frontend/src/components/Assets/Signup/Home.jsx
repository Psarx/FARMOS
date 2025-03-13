import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        alert('Logged Out Successfully!');
        navigate('/login');
    };

    const handleCropPrediction = () => {
        navigate('/crop-prediction');
    };

    const handleDiseaseDetection = () => {
        navigate('/disease-detection');
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.background}></div> {/* Blurred background */}
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
            <div style={styles.content}>
                <h1 style={styles.header}>FarmOS Home Page</h1>
                <p style={styles.description}>Choose one of the following options:</p>
                <div style={styles.buttonContainer}>
                    <button style={styles.orangeButton} onClick={handleCropPrediction}>
                        Crop Prediction
                    </button>
                    <button style={styles.orangeButton} onClick={handleDiseaseDetection}>
                        Disease Detection
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url('/images/wheat.jpg')`, // Background image from public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(5px)', // Blurring the background only
        zIndex: -1, // Keeps it behind other elements
    },
    logoutButton: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'orange',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 10, // Ensures it stays above everything
    },
    content: {
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1, // Ensures the content is above the background
    },
    header: {
        fontSize: '2rem',
        color: '#333',
    },
    description: {
        fontSize: '1.2rem',
        margin: '20px 0',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    orangeButton: {
        backgroundColor: 'orange',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
};

export default Home;
