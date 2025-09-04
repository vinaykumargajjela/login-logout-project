const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session); // Import the session store
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware Setup
app.use(cors({
    // Use the deployed Vercel URL in production, or localhost for development
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    credentials: true // This allows the server to accept cookies from the frontend
}));
app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser()); // To parse cookies

// Session Middleware with Persistent SQLite Store
app.use(session({
    store: new SQLiteStore({
        db: 'users.db',      // The name of the database file
        dir: './',           // The directory where the db is located
        table: 'sessions'    // The table name to store sessions
    }),
    secret: 'a_very_secret_key_that_should_be_in_env_vars', // In a real app, use an environment variable!
    resave: false,
    saveUninitialized: false,
    cookie: {
        // In production, 'secure' should be true if using HTTPS
        secure: process.env.NODE_ENV === 'production',
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

