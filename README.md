# Full-Stack Login & Logout System (React + Node.js)

This is a complete, production-ready user authentication system built with a modern tech stack.  
It features a **React.js frontend**, a **Node.js/Express backend**, and a **lightweight SQLite database**.  
The application allows users to register, log in, and maintain a persistent session, with a protected dashboard route only accessible to authenticated users.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://login-logout-project-ltbqb.vercel.app/](https://login-logout-project-ltbqb.vercel.app/)  
- **Backend (Render):** [https://login-logout-project.onrender.com/](https://login-logout-project.onrender.com/)

---

## ✨ Features

- **User Registration:** Securely create new user accounts with email and password.  
- **User Login:** Authenticate users against stored credentials.  
- **Password Hashing:** All passwords are securely hashed using **bcrypt** before being stored in the database.  
- **Persistent Sessions:** Uses **connect-sqlite3** to store session data, allowing users to stay logged in even after server restarts.  
- **Protected Routes:** The `/dashboard` route is only accessible to authenticated users.  
- **Responsive UI:** A clean and modern user interface that works on all screen sizes.  
- **Live Deployment:** Fully deployed with a CI/CD pipeline using **Vercel** and **Render**.  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** SQLite  
- **Authentication:** express-session, connect-sqlite3, bcrypt  
- **Deployment:** Vercel (Frontend), Render (Backend)  

---

## 📂 Project Structure

```bash
login-logout-project/
│
├── backend/
│   ├── node_modules/
│   ├── routes/
│   │   └── auth.js         # API routes for authentication
│   ├── db.js               # SQLite database connection setup
│   ├── server.js           # Main Express server file
│   ├── package.json
│   └── users.db            # Database file (auto-generated)
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Dashboard.js
│       │   ├── Login.js
│       │   └── Register.js
│       ├── App.css
│       ├── App.js          # Main component with routing logic
│       ├── index.css
│       └── index.js
│
├── .gitignore              # Specifies files for Git to ignore
└── README.md


```

⚙️ Setup and Run Locally

To get a local copy up and running, follow these simple steps:

🔹 Prerequisites

Node.js (version 16 or later recommended)

npm (comes with Node.js)

🔹 Installation

Clone the repository:

git clone https://github.com/vinaykumargajjela/login-logout-project.git

cd your-repo-name


Set up the Backend:

cd backend
npm install


Set up the Frontend:

cd ../frontend
npm install

🔹 Running the Application

You will need two separate terminals to run both the frontend and backend servers simultaneously.

Run the Backend Server:
(inside backend directory)

node server.js


Backend will run at 👉 http://localhost:3001

Run the Frontend Application:
(inside frontend directory)

npm start


Frontend will run at 👉 http://localhost:3000


---

