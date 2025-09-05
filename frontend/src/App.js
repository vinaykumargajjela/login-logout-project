import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        const checkUserSession = async () => {
            try {
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

    if (loading) {
        return <div className="loading-container">Authenticating...</div>;
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
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </li>
                        )}
                    </ul>
                </nav>

                <main className="content-area">
                    <Routes>
                        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" />} />
                        <Route path="/login" element={!isLoggedIn ? <Login onLoginSuccess={handleLogin} /> : <Navigate to="/dashboard" />} />
                        <Route 
                            path="/dashboard" 
                            element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" />} 
                        />
                        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

