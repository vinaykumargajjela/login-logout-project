import React from 'react';
import './Dashboard.css'; // Import the dashboard-specific styles

// The onLogout prop and handleLogout function have been removed
function Dashboard({ user }) {
    return (
         <div className="dashboard-container">
          <h2>Dashboard</h2>
            {user ? (
                       <>
                    <p className="welcome-message">Welcome, <span className="user-email">{user.email}</span>!</p>
                     <p>You have successfully logged in and your session is active.</p>
{/* The logout button has been removed from here */}
                  </>
               ) : (
              <p>Loading user data...</p>
          )}
 </div>
 );
}

export default Dashboard;

