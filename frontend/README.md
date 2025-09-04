React.js & Node.js Login/Logout Flow (SQLite)
A simple but complete user authentication system built with React, Node.js, Express, and an SQLite database. This project demonstrates user registration, secure login, session management via cookies, and protected routes, featuring a clean and responsive user interface.

🚀 Features
User Registration: New users can sign up with an email and password.

Secure Login: Authentication with credentials stored in the database.

Password Hashing: Passwords are securely hashed using bcrypt before being stored.

Session Management: Uses express-session to keep users logged in via secure, HTTP-only cookies.

Protected Routes: The /dashboard route is only accessible to authenticated users.

Logout: Clears the user session on both the server and client.

Responsive UI: A modern and clean user interface that works on all screen sizes.

Error Handling: Provides clear feedback for duplicate emails, invalid credentials, and other errors.

🛠 Tech Stack
Frontend: React.js, React Router, Axios

Backend: Node.js, Express.js

Database: SQLite

Authentication: express-session for session management, bcrypt for password hashing.

Middleware: cors, cookie-parser

📂 Project Structure
login-logout-project/
│
├── backend/
│   ├── server.js         # Main Express server setup
│   ├── db.js             # SQLite database connection and table creation
│   ├── routes/
│   │   └── auth.js       # All authentication API routes (/register, /login, etc.)
│   ├── package.json
│   └── users.db          # Database file (auto-generated on first run)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Dashboard.css
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── forms.css         # Shared styles for login/register forms
│   │   ├── App.js                # Main component with all routing logic
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css             # Global styles
│   └── package.json
│
└── README.md

⚙️ Setup & Run
Prerequisites
Node.js (v14 or higher)

npm (or yarn)

1. Backend Setup
First, navigate to the backend directory to install dependencies and start the server.

# Go to the backend directory
cd backend

# Install all required packages
npm install

# Start the server
node server.js

# The backend will now be running on http://localhost:3001

2. Frontend Setup
Open a new terminal window and navigate to the frontend directory.

# Go to the frontend directory
cd frontend

# Install all required packages
npm install

# Start the React application
npm start

# The frontend will open automatically in your browser at http://localhost:3000

3. Database
The SQLite database file (users.db) is created automatically in the /backend directory the first time you run the backend server. No manual database setup is required.