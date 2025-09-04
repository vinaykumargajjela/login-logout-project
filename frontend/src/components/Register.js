import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forms.css'; // Import shared form styles

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', { email, password });
            setMessage(response.data.message);
            // Redirect to login page after a short delay on success
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            // Use optional chaining to safely access error response data
            setMessage(error.response?.data?.message || 'An error occurred during registration.');
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Register</button>
            </form>
            {/* Conditionally apply 'success' or 'error' class to the message */}
            {message && <p className={`form-message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
        </div>
    );
}

export default Register;

