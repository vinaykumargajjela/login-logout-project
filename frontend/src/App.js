import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css'; // <-- MAKE SURE THIS LINE IS HERE

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/auth/check-session', { withCredentials: true });
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
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <ul className="nav-list">
                        {!isLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isLoggedIn && <li><Link className="nav-link" to="/register">Register</Link></li>}
                        {isLoggedIn && <li><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}
                    </ul>
                </nav>

                <main>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
                        <Route 
                            path="/dashboard" 
                            element={isLoggedIn ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
                        />
                        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

