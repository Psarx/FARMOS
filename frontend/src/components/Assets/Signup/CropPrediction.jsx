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
                setResponseData(data); // Store the full JSON response
            } else {
                setError(data.message || 'Error predicting crop');
            }
        } catch (err) {
            setError('Failed to connect to the backend');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Crop Prediction</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key} style={styles.inputGroup}>
                        <label style={styles.label} htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </label>
                        <input
                            type="text"
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
                    <h2 style={styles.result}>Response from Backend:</h2>
                    <pre style={styles.jsonResponse}>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div style={styles.errorContainer}>
                    <h2 style={styles.error}>{error}</h2>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },
    header: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '350px',
        margin: '0 auto',
    },
    inputGroup: {
        width: '100%',
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    resultContainer: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e3fcef',
        borderRadius: '5px',
        display: 'inline-block',
        textAlign: 'left',
    },
    result: {
        color: '#155724',
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
        backgroundColor: '#f8d7da',
        borderRadius: '5px',
        display: 'inline-block',
    },
    error: {
        color: '#721c24',
        fontWeight: 'bold',
    },
};

export default CropPrediction;
