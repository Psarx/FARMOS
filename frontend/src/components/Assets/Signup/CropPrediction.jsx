import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./CropPrediction.css";

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

    const [cropDetails, setCropDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [visiblePoints, setVisiblePoints] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCropDetails(null);
        setError(null);
        setLoading(true);
        setShowResults(false);
        setVisiblePoints([]);

        try {
            // Get the prediction from the Hugging Face integration
            const predictResponse = await fetch("http://localhost:5001/api/auth/predict", {
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

            const predictData = await predictResponse.json();
            
            if (!predictResponse.ok) {
                setLoading(false);
                setError(predictData.message || "Error predicting crop");
                return;
            }
            
            setLoading(false);
            
            // Set the new format data directly
            setCropDetails({
                name: predictData.recommended_crop,
                farmingGuide: predictData.farming_guide
            });
            
            // Trigger the animation after successful prediction
            setTimeout(() => setShowResults(true), 300);
        } catch (err) {
            setLoading(false);
            setError("Failed to connect to the backend");
        }
    };

    // Format the farming guide as points
    const formatGuideAsPoints = (guide) => {
        if (!guide) return [];
        
        // Split by newlines and filter out empty strings
        const lines = guide.split('\n').filter(line => line.trim().length > 0);
        
        // Filter out lines that look like headers or section titles
        const contentLines = lines.filter(line => {
            // Filter out the prompt part
            if (line.includes("I am a beginner farmer") || 
                line.includes("Can you provide") ||
                line.includes("Please include") ||
                line.includes("Please respond") ||
                line.includes("User 0:") ||
                line.includes("-------------------------")) {
                return false;
            }
            return true;
        });
        
        // Join remaining lines and split by sentences for better readability
        const sentences = contentLines.join(' ')
            .split('.')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(s => s + '.');
            
        return sentences;
    };

    // Effect to gradually reveal the crop information points
    useEffect(() => {
        if (cropDetails && showResults) {
            const points = formatGuideAsPoints(cropDetails.farmingGuide);
            const totalPoints = points.length;
            
            if (totalPoints > 0) {
                const intervalTime = 500; // Time between each point appearing
                
                const interval = setInterval(() => {
                    setVisiblePoints(prev => {
                        const newCount = prev.length + 1;
                        if (newCount >= totalPoints) {
                            clearInterval(interval);
                            return points;
                        }
                        return points.slice(0, newCount);
                    });
                }, intervalTime);
                
                return () => clearInterval(interval);
            }
        }
    }, [cropDetails, showResults]);

    return (
        <div className="page-container">
            {/* Farm Field Background Overlay */}
            <div className="background-overlay"></div>
            
            {/* Animated plants */}
            <motion.div 
                className="plant-decoration"
                style={{left: '5%', bottom: '10%'}}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                🌿
            </motion.div>
            <motion.div 
                className="plant-decoration"
                style={{left: '15%', bottom: '5%'}}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                🌱
            </motion.div>
            <motion.div 
                className="plant-decoration"
                style={{right: '10%', bottom: '12%'}}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
                🌾
            </motion.div>
            <motion.div 
                className="plant-decoration"
                style={{right: '20%', bottom: '7%'}}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
                🍃
            </motion.div>

            {/* Home Button */}
            <motion.button 
                onClick={() => navigate("/home")} 
                className="home-button"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 122, 87, 0.2)" }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="home-icon">🏡</span> Back to Farm
            </motion.button>

            <div className="content-container">
                {/* FarmOS Branding - Shows initially and fades out when results appear */}
                <AnimatePresence>
                    {!showResults && (
                        <motion.div 
                            className="branding-container"
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: showResults ? 0 : 1, scale: showResults ? 0.9 : 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1 
                                className="branding-title"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <span className="brand-highlight">Farm</span>OS
                            </motion.h1>
                            <motion.div 
                                className="branding-title-underline"
                                initial={{ width: 0 }}
                                animate={{ width: "90%" }}
                                transition={{ delay: 0.6, duration: 1.2 }}
                            />
                            <motion.h2 
                                className="branding-subtitle"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            >
                                Your Perfect Farming Advisor
                            </motion.h2>
                            <motion.p 
                                className="branding-description"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                            >
                                Enter your soil and climate data to discover the ideal crop for your farm. 
                                Our advanced algorithm analyzes your conditions to provide personalized recommendations.
                            </motion.p>
                            <motion.div 
                                className="branding-icons"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.8 }}
                            >
                                <span className="icon-large">🌾</span>
                                <span className="icon-large">🌱</span>
                                <span className="icon-large">🌿</span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Component */}
                <motion.div
                    className={`form-container ${showResults ? 'shifted' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0
                    }}
                    transition={{ 
                        duration: 0.8, 
                        ease: "easeInOut"
                    }}
                >
                    <motion.h1 
                        className="header"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        🌱 Crop Advisor
                    </motion.h1>
                    
                    <p className="sub-header">Enter your soil and weather conditions to find the perfect crop</p>
                    
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3 className="section-title">🧪 Soil Nutrients (mg/kg)</h3>
                            <div className="row">
                                {[
                                    { key: "N", name: "Nitrogen" },
                                    { key: "P", name: "Phosphorus" },
                                    { key: "K", name: "Potassium" }
                                ].map((nutrient) => (
                                    <div key={nutrient.key} className="input-group">
                                        <label className="label" htmlFor={nutrient.key}>
                                            {nutrient.name}:
                                        </label>
                                        <motion.input
                                            type="number"
                                            id={nutrient.key}
                                            name={nutrient.key}
                                            value={formData[nutrient.key]}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                            whileFocus={{ scale: 1.03, borderColor: "#55c57a" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="section-title">☁️ Environmental Factors</h3>
                            {[
                                { key: "temperature", name: "Temperature (°C)", icon: "🌡️" },
                                { key: "humidity", name: "Humidity (%)", icon: "💧" },
                                { key: "ph", name: "Soil pH", icon: "⚗️" },
                                { key: "rainfall", name: "Annual Rainfall (mm)", icon: "🌧️" }
                            ].map((factor, index) => (
                                <div key={factor.key} className="input-group">
                                    <label className="label" htmlFor={factor.key}>
                                        {factor.icon} {factor.name}:
                                    </label>
                                    <motion.input
                                        type="number"
                                        id={factor.key}
                                        name={factor.key}
                                        value={formData[factor.key]}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        whileFocus={{ scale: 1.03, borderColor: "#55c57a" }}
                                    />
                                </div>
                            ))}
                        </div>

                        <motion.button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                            whileHover={{ scale: 1.05, backgroundColor: "#46a55e" }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {loading ? (
                                <motion.div
                                    className="loading-container"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="loading-text">Analyzing soil and climate data...</span>
                                </motion.div>
                            ) : (
                                <>🔍 Find Ideal Crop</>
                            )}
                        </motion.button>
                    </form>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                className="error-container"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="error">⚠️ {error}</h2>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Results Component */}
                <AnimatePresence>
                    {cropDetails && (
                        <motion.div
                            className="result-container"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ 
                                opacity: showResults ? 1 : 0, 
                                x: showResults ? "0%" : "100%",
                            }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ 
                                duration: 1, 
                                ease: "easeInOut",
                                delay: 0.5,
                                type: "spring", 
                                stiffness: 80 
                            }}
                        >
                            <motion.div
                                className="result-header"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                <motion.div 
                                    className="result-icon"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 1.5, delay: 1.5 }}
                                >
                                    🌾
                                </motion.div>
                                <h2 className="result-title">
                                    Perfect Crop Match
                                </h2>
                            </motion.div>
                            
                            <motion.div 
                                className="crop-name-wrapper"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                            >
                                <p className="crop-name">{cropDetails.name}</p>
                                <motion.div 
                                    className="crop-name-underline"
                                    initial={{ width: 0 }}
                                    animate={{ width: "80%" }}
                                    transition={{ delay: 1.7, duration: 0.8 }}
                                />
                            </motion.div>
                            
                            <motion.div 
                                className="details-container"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8, duration: 0.5 }}
                            >
                                <div className="crop-info full-width">
                                    <h3 className="crop-info-title">Farming Guide:</h3>
                                    {visiblePoints.map((point, index) => (
                                        <motion.div 
                                            key={index} 
                                            className="point-item"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.span 
                                                className="bullet-point"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                🌱
                                            </motion.span>
                                            <span className="point-text">{point}</span>
                                        </motion.div>
                                    ))}
                                    
                                    {/* Display a typing indicator if there are more points to show */}
                                    {cropDetails && showResults && visiblePoints.length < formatGuideAsPoints(cropDetails.farmingGuide).length && (
                                        <motion.div 
                                            className="typing-indicator"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 1.2, repeat: Infinity }}
                                        >
                                            <span>•</span>
                                            <span>•</span>
                                            <span>•</span>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            <motion.button
                                className="new-search-button"
                                onClick={() => {
                                    setShowResults(false);
                                    setTimeout(() => {
                                        setCropDetails(null);
                                        setFormData({
                                            N: "",
                                            P: "",
                                            K: "",
                                            temperature: "",
                                            humidity: "",
                                            ph: "",
                                            rainfall: "",
                                        });
                                    }, 800);
                                }}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 122, 87, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                            >
                                🔄 Try Another Analysis
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CropPrediction;