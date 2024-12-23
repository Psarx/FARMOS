// import React from 'react';

// const Home = () => {
//     const handleLogout = () => {
//         alert('Logged Out Successfully!');
//     };

//     const handleCropPrediction = () => {
//         alert('Navigating to Crop Prediction...');
//     };

//     const handleDiseaseDetection = () => {
//         alert('Navigating to Disease Detection...');
//     };

//     return (
//         <div style={styles.container}>
//             {/* Logout Button */}
//             <button style={styles.logoutButton} onClick={handleLogout}>
//                 Logout
//             </button>

//             {/* Main Content */}
//             <h1 style={styles.header}>FarmOS Home Page</h1>
//             <p style={styles.description}>
//                 Choose one of the following options to proceed:
//             </p>

//             <div style={styles.buttonContainer}>
//                 <button style={styles.orangeButton} onClick={handleCropPrediction}>
//                     Crop Prediction
//                 </button>
//                 <button style={styles.orangeButton} onClick={handleDiseaseDetection}>
//                     Disease Detection
//                 </button>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         textAlign: 'center',
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif',
//     },
//     logoutButton: {
//         position: 'absolute',
//         top: '10px',
//         left: '10px',
//         backgroundColor: 'orange',
//         color: 'white',
//         border: 'none',
//         padding: '10px 20px',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         fontWeight: 'bold',
//     },
//     header: {
//         fontSize: '2rem',
//         color: '#333',
//     },
//     description: {
//         fontSize: '1.2rem',
//         margin: '20px 0',
//     },
//     buttonContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '20px',
//         marginTop: '20px',
//     },
//     orangeButton: {
//         backgroundColor: 'orange',
//         color: 'white',
//         border: 'none',
//         padding: '15px 30px',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         fontSize: '1rem',
//         fontWeight: 'bold',
//     },
// };

// export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const handleCropPrediction = () => {
        navigate('/crop-prediction');
    };

    const handleDiseaseDetection = () => {
        navigate('/disease-detection');
    };

    return (
        <div style={styles.container}>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
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
    );
};

const styles = {
    container: { textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' },
    logoutButton: {
        position: 'absolute', top: '10px', left: '10px', backgroundColor: 'orange', color: 'white',
        border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold',
    },
    header: { fontSize: '2rem', color: '#333' },
    description: { fontSize: '1.2rem', margin: '20px 0' },
    buttonContainer: {
        display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px',
    },
    orangeButton: {
        backgroundColor: 'orange', color: 'white', border: 'none', padding: '15px 30px',
        borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold',
    },
};

export default Home;
