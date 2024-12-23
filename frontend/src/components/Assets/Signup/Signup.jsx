import './Signup.css';
import React, { useState } from 'react';
import wheat from '../wheat.jpg';

const Signup = () => {
    const [action, setAction] = useState("Sign Up");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const url = action === "Sign Up" ? "/register" : "/login";
        const payload = action === "Sign Up"
            ? { username: formData.name, email: formData.email, password: formData.password }
            : { email: formData.email, password: formData.password };

        try {
            const response = await fetch(`/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`${action} successful!`);
                if (action === "Login") {
                    // Save user data to localStorage or state management
                    console.log("Logged in user:", data.user);
                }
            } else {
                setMessage(data.message || "An error occurred");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="main-container">
                <div className="left-section">
                    <div className="header">
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        {action === "Login" ? null : (
                            <div className="input">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="input">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail id"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {message && <div className="message">{message}</div>}
                    <div className="submit-container">
                        <button
                            className={action === "Login" ? "submit gray" : "submit"}
                            onClick={() => {
                                setAction("Sign Up");
                                setMessage("");
                            }}
                        >
                            Sign Up
                        </button>
                        <button
                            className={action === "Sign Up" ? "submit gray" : "submit"}
                            onClick={() => {
                                setAction("Login");
                                setMessage("");
                            }}
                        >
                            Login
                        </button>
                    </div>
                    <div className="submit-button" onClick={handleSubmit}>
                        {action}
                    </div>
                </div>
                <div className="right-panel">
                    <img src={wheat} alt="Background" className="background-image" />
                </div>
            </div>
        </div>
    );
};

export default Signup;
