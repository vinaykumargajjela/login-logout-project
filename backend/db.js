const sqlite3 = require('sqlite3').verbose();

// Connect to a database file. If it doesn't exist, it will be created.
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create the users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error("Error creating table", err.message);
            }
        });
    }
});

module.exports = db;