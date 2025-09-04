import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the dashboard-specific styles

function Dashboard({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
            onLogout(); // Update the state in App.js
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Dashboard</h2>
                {user ? (
                    <>
                        <p className="welcome-message">Welcome, <span className="user-email">{user.email}</span>!</p>
                        <p>You have successfully logged in and your session is active.</p>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <p>Loading user data...</p> // This message shows briefly while the session is being checked
                )}
            </div>
        </div>
    );
}

export default Dashboard;

