import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import wheat from '../Assets/wheat.jpg'; // Background image path

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [action, setAction] = useState('Sign Up');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/register', { username, email, password });
      alert('Signup successful! Please log in.');
      navigate('/'); // Redirect to login page
    } catch (error) {
      alert('Signup failed: ' + (error.response?.data?.message || error.message));
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
          <form onSubmit={handleSubmit} className="inputs">
            {action === 'Sign Up' && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">{action}</button>
          </form>
          <div className="submit-container">
            <div
              className={action === 'Login' ? 'submit gray' : 'submit'}
              onClick={() => setAction('Sign Up')}
            >
              Sign Up
            </div>
            <div
              className={action === 'Sign Up' ? 'submit gray' : 'submit'}
              onClick={() => setAction('Login')}
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
