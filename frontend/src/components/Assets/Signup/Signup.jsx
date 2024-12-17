import './Signup.css';
import React, { useState } from 'react';
import wheat from '../wheat.jpg';
// Background image path

const Signup = () => {
    const [action, setAction] = useState("Sign Up");

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
                                <input type="text" placeholder="Name" />
                            </div>
                        )}
                        <div className="input">
                            <input type="email" placeholder="E-mail id" />
                        </div>
                        <div className="input">
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="submit-container">
                        <div
                            className={action === "Login" ? "submit gray" : "submit"}
                            onClick={() => setAction("Sign Up")}
                        >
                            Sign Up
                        </div>
                        <div
                            className={action === "Sign Up" ? "submit gray" : "submit"}
                            onClick={() => setAction("Login")}
                        >
                            Login
                        </div>
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
