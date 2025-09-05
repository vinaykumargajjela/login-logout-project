import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './forms.css';

// This is the crucial change: Use the environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            // Use the API_URL variable instead of a hard-coded string
            const response = await axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });
            
            // Call the function passed from App.js to update the global state
            onLoginSuccess(response.data.user); 
            
            // Redirect to the dashboard on successful login
            navigate('/dashboard');
        } catch (error) {
            // Display any error messages from the backend
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="form-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <p className="form-subtitle">Welcome back! Please enter your details.</p>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Sign In</button>
                {message && <p className="error-message">{message}</p>}
                <p className="redirect-link">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;

