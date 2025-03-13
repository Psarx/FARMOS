import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import wheatImage from '../../Assets/Images/wheat.jpg'; // Corrected image path

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('Sign Up');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = action === 'Sign Up' ? 'register' : 'login';
    try {
      await axios.post(`http://localhost:5001/api/auth/${endpoint}`, { username, email, password });
      alert(`${action} successful!`);
      navigate('/home'); // Redirect after success
    } catch (error) {
      alert(`${action} failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container1">
      <div className="main-container1">
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
            <button type="submit" className="orange-button">{action}</button>
          </form>
          <button
            className="orange-button action-button"
            onClick={() => setAction(action === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {action === 'Sign Up' ? 'Login' : 'Sign Up'}
          </button>
        </div>
        <div className="right-panel">
          <img src={wheatImage} alt="Wheat background" className="background-image" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
