import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/auth';

// Signup API
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Login API
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
