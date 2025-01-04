// import React from 'react';

// const DiseaseDetection = () => {
//     return (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//             <h1>Disease Detection</h1>
//             <p>Here you can input data for disease detection.</p>
//         </div>
//     );
// };

// export default DiseaseDetection;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiseaseDetection.css';

const DiseaseDetection = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();  // useNavigate hook to navigate programmatically

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            const fileType = selectedFile.type;
            if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
                setFile(selectedFile);
            } else {
                alert('Please upload a valid file (jpg, png, or pdf).');
            }
        }
    };

    const handleDetectDisease = () => {
        alert('Disease detection in progress...');
    };

    const handleLogout = () => {
        navigate('/login');  // Navigate to login page
    };

    return (
        <div style={styles.container}>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
            
            <h1 style={styles.header}>Disease Detection</h1>
            <p style={styles.description}>Upload an image or PDF file for disease detection:</p>
            
            <input
                type="file"
                accept=".jpg, .png, .pdf"
                onChange={handleFileChange}
                style={styles.fileInput}
            />
            
            {file && (
                <div>
                    <h3>File Selected:</h3>
                    <p>{file.name}</p>
                    {/* Preview for image files */}
                    {file.type.startsWith('image') && (
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            style={styles.imagePreview}
                        />
                    )}
                    {/* Message for PDF files */}
                    {file.type === 'application/pdf' && (
                        <p>PDF file selected. You can process this file for disease detection.</p>
                    )}
                </div>
            )}

            {/* Detect Disease Button */}
            <button style={styles.orangeButton} onClick={handleDetectDisease}>
                Detect Disease
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    logoutButton: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'orange',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    header: {
        fontSize: '2rem',
        color: '#333',
    },
    description: {
        fontSize: '1.2rem',
        margin: '20px 0',
    },
    fileInput: {
        padding: '10px',
        fontSize: '1rem',
        marginTop: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    imagePreview: {
        maxWidth: '300px',
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
        marginTop: '20px',
    },
};

export default DiseaseDetection;