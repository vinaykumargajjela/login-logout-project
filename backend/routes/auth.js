const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // Import the database connection
const router = express.Router();

const saltRounds = 10; // Standard number of salt rounds for hashing

// POST /api/auth/register
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Hash the password before storing it
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password." });
        }

        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.run(sql, [email, hash], function(err) {
            if (err) {
                // Check for the unique constraint error
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(409).json({ message: "Email already exists." });
                }
                return res.status(500).json({ message: "Error registering user." });
            }
            res.status(201).json({ message: "User registered successfully!", userId: this.lastID });
        });
    });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the submitted password with the stored hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error comparing passwords." });
            }
            if (isMatch) {
                // Passwords match! Create a session.
                req.session.userId = user.id; // Store user ID in session
                req.session.email = user.email;
                return res.status(200).json({ message: "Logged in successfully.", user: { id: user.id, email: user.email }});
            } else {
                // Passwords don't match
                return res.status(401).json({ message: "Invalid credentials." });
            }
        });
    });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out, please try again.' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        return res.status(200).json({ message: 'Logged out successfully.' });
    });
});

// GET /api/auth/check-session (A helper route for the frontend)
router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ isLoggedIn: true, user: { id: req.session.userId, email: req.session.email } });
    } else {
        res.status(200).json({ isLoggedIn: false });
    }
});


module.exports = router;