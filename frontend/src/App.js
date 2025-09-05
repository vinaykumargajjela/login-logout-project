import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

// This is the crucial change: Use the environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                // Use the API_URL variable instead of a hard-coded string
                const response = await axios.get(`${API_URL}/api/auth/check-session`, { withCredentials: true });
                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setLoading(false);
            }
        };
        checkUserSession();
    }, []);

    const handleLogin = (loggedInUser) => {
        setIsLoggedIn(true);
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <div className="nav-logo">
                        <Link to="/">AuthSystem</Link>
                    </div>
                    <ul className="nav-links">
                        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
                        {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
                        {isLoggedIn && user && <li className="nav-user">Welcome, {user.email}</li>}
                        {isLoggedIn && (
                            <li>
                                <Dashboard onLogout={handleLogout} />
                            </li>
                        )}
                    </ul>
                </nav>

                <main className="content">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
                        <Route
                            path="/dashboard"
                            element={isLoggedIn ? <div className="dashboard-page"><h2>Dashboard Content</h2><p>You are logged in and can see this protected content.</p></div> : <Navigate to="/login" />}
                        />
                        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

