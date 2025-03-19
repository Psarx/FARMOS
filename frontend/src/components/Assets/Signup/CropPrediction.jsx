import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const CropPrediction = () => {
    const [formData, setFormData] = useState({
        N: "",
        P: "",
        K: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: "",
    });
    const navigate = useNavigate();

    const [recommendedCrop, setRecommendedCrop] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRecommendedCrop(null);
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
            setLoading(false);

            if (response.ok) {
                setRecommendedCrop(data.recommended_crop);
            } else {
                setError(data.message || "Error predicting crop");
            }
        } catch (err) {
            setLoading(false);
            setError("Failed to connect to the backend");
        }
    };

    return (
        <div style={styles.pageContainer}>
            {/* Home Button */}
            <button onClick={() => navigate("/home")} style={styles.homeButton}>
                ⬅ Home
            </button>
            <motion.div
                style={styles.container}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={styles.header}>🌱 Crop Prediction</h1>
            
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.row}>
                        {["N", "P", "K"].map((key) => (
                            <div key={key} style={styles.inputGroup}>
                                <label style={styles.label} htmlFor={key}>
                                    {key}:
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
                    </div>

                    {["temperature", "humidity", "ph", "rainfall"].map((key) => (
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

                    <motion.button
                        type="submit"
                        style={styles.submitButton}
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {loading ? "Predicting..." : "Predict Crop"}
                    </motion.button>
                </form>

                {recommendedCrop && (
                    <motion.div
                        style={styles.resultContainer}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 style={styles.result}>🌾 Recommended Crop:</h2>
                        <p style={styles.cropName}>{recommendedCrop}</p>
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        style={styles.errorContainer}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 style={styles.error}>⚠️ {error}</h2>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

const styles = {
    pageContainer: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a1a", // Dark grayish-black background
        color: "#ff7b42",
    },
    container: {
        width: "500px",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 10px 20px #ff7b42",
        textAlign: "center",
        backgroundColor: "#222", // Slightly lighter grayish-black
    },
    header: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#ff7b42",
        marginBottom: "15px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    label: {
        fontWeight: "600",
        color: "#ff7b42",
        marginBottom: "5px",
    },
    homeButton: {
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "10px 15px",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#ff7b42",
        backgroundColor: "transparent",
        border: "2px solid #ff7b42",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s, color 0.3s",
    },
    input: {
        width: "90%",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ff7b42",
        fontSize: "14px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "#ff7b42",
        transition: "border-color 0.3s, transform 0.3s",
        boxSizing: "border-box",
    },
    submitButton: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#000",
        backgroundColor: "#ff7b42",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background 0.3s, transform 0.3s",
    },
    resultContainer: {
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        borderRadius: "8px",
        textAlign: "center",
    },
    result: {
        color: "#ff7b42",
        fontWeight: "bold",
    },
    cropName: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#ff7b42",
    },
    errorContainer: {
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#ff000033",
        borderRadius: "8px",
        textAlign: "center",
    },
    error: {
        color: "#ff4444",
        fontWeight: "bold",
    },
};

export default CropPrediction;
