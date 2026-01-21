import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import wheatImage from '../../Assets/Images/wheat.jpg';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('Login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = action === 'Sign Up' ? 'register' : 'login';
    try {
      await axios.post(`http://localhost:5001/api/auth/${endpoint}`, { username, email, password });
      setTimeout(() => {
        navigate('/home');
      }, 500);
    } catch (error) {
      setIsLoading(false);
      alert(`${action} failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-content">
            <div className="logo-section">
              <div className="logo-icon">🌾</div>
              <h1 className="logo-text">
                <span className="logo-farm">Farm</span>
                <span className="logo-os">OS</span>
              </h1>
            </div>
            
            <div className="auth-header">
              <h2 className="auth-title">
                {action === 'Login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="auth-subtitle">
                {action === 'Login' 
                  ? 'Enter your credentials to access your dashboard' 
                  : 'Join us to manage your farm efficiently'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {action === 'Sign Up' && (
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {action === 'Login' && (
                <div className="form-footer">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
              )}

              <button 
                type="submit" 
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loader"></span>
                ) : (
                  action
                )}
              </button>
            </form>

            <div className="auth-switch">
              <span className="switch-text">
                {action === 'Login' 
                  ? "Don't have an account?" 
                  : "Already have an account?"}
              </span>
              <button
                className="switch-btn"
                onClick={() => setAction(action === 'Sign Up' ? 'Login' : 'Sign Up')}
              >
                {action === 'Sign Up' ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <img src={wheatImage} alt="Farm landscape" className="auth-image" />
          <div className="image-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
