const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001; // Use 3001 to avoid conflict with React's default 3000

// Middleware Setup
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use deployed URL or localhost
    credentials: true // This allows the server to accept cookies from the frontend
}));
app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser()); // To parse cookies

// Session Middleware
app.use(session({
    secret: 'a_very_secret_key_that_should_be_in_env_vars', // In a real app, use an environment variable!
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if you are using https
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        maxAge: 1000 * 60 * 60 * 24 // Cookie expires in 24 hours
    }
}));


// API Routes
app.use('/api/auth', authRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});