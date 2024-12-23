import './Signup.css';
import React from 'react';
import wheat from '../wheat.jpg';

const Login = () => {
    return (
        <div className="container">
            <div className="main-container">
                <div className="left-section">
                    <div className="header">
                        <div className="text">Login</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="email" placeholder="E-mail id" />
                        </div>
                        <div className="input">
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="submit-container">
                        <div className="submit">
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

export default Login;
