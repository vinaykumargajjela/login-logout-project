import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forms.css'; // Don't forget to import the shared form styles

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 'withCredentials: true' is crucial for sending the session cookie
            const response = await axios.post('http://localhost:3001/api/auth/login', { email, password }, { withCredentials: true });
            
            // Call the function passed from App.js to update the global state
            onLoginSuccess(response.data.user); 
            
            // Redirect to the dashboard on successful login
            navigate('/dashboard');
        } catch (error) {
            // Display any error messages from the backend
            setMessage(error.response.data.message || 'An error occurred.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
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
                <button type="submit" className="form-button">Login</button>
            </form>
            {message && <p className="form-message error">{message}</p>}
        </div>
    );
}

export default Login;

