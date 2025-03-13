import React, { useState } from 'react';

const CropPrediction = () => {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
    });

    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseData(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/auth/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    N: parseFloat(formData.N),
                    P: parseFloat(formData.P),
                    K: parseFloat(formData.K),
                    temperature: parseFloat(formData.temperature),
                    humidity: parseFloat(formData.humidity),
                    ph: parseFloat(formData.ph),
                    rainfall: parseFloat(formData.rainfall),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseData(data);
            } else {
                setError(data.message || 'Error predicting crop');
            }
        } catch (err) {
            setError('Failed to connect to the backend');
        }
    };

    const handleLogout = () => {
        console.log('Logged out'); 
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>

                <h1 style={styles.header}>Crop Prediction</h1>

                <form style={styles.form} onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key) => (
                        <div key={key} style={styles.inputGroup}>
                            <label style={styles.label} htmlFor={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </label>
                            <input
                                type="number"
                                id={key}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit" style={styles.submitButton}>
                        Predict Crop
                    </button>
                </form>

                {responseData && (
                    <div style={styles.resultContainer}>
                        <h2 style={styles.result}>🌱 Suggested Crop:</h2>
                        <pre style={styles.jsonResponse}>{JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                )}
                {error && (
                    <div style={styles.errorContainer}>
                        <h2 style={styles.error}>⚠️ {error}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light gray background
    },
    container: {
        background: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        width: '500px',
        textAlign: 'center',
    },
    logoutButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#fff',
        backgroundColor: '#ff7700',
        padding: '10px',
        borderRadius: '6px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        textAlign: 'left',
    },
    label: {
        display: 'block',
        fontWeight: '600',
        color: '#555',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s',
        boxSizing: 'border-box',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#ff7700',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    resultContainer: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fffbec',
        borderRadius: '8px',
        textAlign: 'center',
    },
    result: {
        color: '#d98300',
        fontWeight: 'bold',
    },
    jsonResponse: {
        fontSize: '14px',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    errorContainer: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#ffe0e0',
        borderRadius: '8px',
        textAlign: 'center',
    },
    error: {
        color: '#b00020',
        fontWeight: 'bold',
    },
};

export default CropPrediction;
