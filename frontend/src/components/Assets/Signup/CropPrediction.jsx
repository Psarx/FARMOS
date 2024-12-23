import React, { useState } from 'react';

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
        console.log('Submitted Data:', formData);

        // Simulate an API call or database update
        alert('Crop Prediction data submitted successfully!');
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
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: 'orange',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'center',
    },
};

export default CropPrediction;
