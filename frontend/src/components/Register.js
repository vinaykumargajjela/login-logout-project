import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './forms.css';

// This is the crucial change: Use the environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            // Use the API_URL variable instead of a hard-coded string
            const response = await axios.post(`${API_URL}/api/auth/register`, { email, password });
            setMessage(response.data.message + ' Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            // Display any error messages from the backend
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="form-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <p className="form-subtitle">Get started with your new account.</p>
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
                <button type="submit" className="submit-btn">Sign Up</button>
                {message && <p className={message.includes('success') ? "success-message" : "error-message"}>{message}</p>}
                 <p className="redirect-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;

