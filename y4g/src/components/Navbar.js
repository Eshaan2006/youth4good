import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router for navigation
import { useAuth } from '../AuthProvider'; // Import custom auth hook

const NavBar = () => {
  const { user, logout } = useAuth(); // Get the current user and logout function from auth context
  const [showConfirmLogout, setShowConfirmLogout] = useState(false); // State to manage the logout confirmation dialog

  // Handle click on user's name
  const handleUserNameClick = () => {
    setShowConfirmLogout(true); // Show confirmation prompt
  };

  // Handle confirmation of logout
  const handleLogoutConfirm = () => {
    logout(); // Call logout function
    setShowConfirmLogout(false); // Hide confirmation prompt
  };

  // Handle cancellation of logout
  const handleLogoutCancel = () => {
    setShowConfirmLogout(false); // Hide confirmation prompt
  };

  return (
    <nav>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/events" style={styles.navLink}>Events</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>About</Link>
        </li>
        
        {/* Conditionally render the Log In link or User Name */}
        {user ? (
          <>
            <li style={styles.navItem}>
              {/* User's name is clickable and shows confirmation on click */}
              <span 
                style={{ ...styles.navLink, cursor: 'pointer' }} 
                onClick={handleUserNameClick}
              >
                {user.displayName || user.email.split('@')[0]} {/* Display user's name or email */}
              </span>
            </li>
          </>
        ) : (
          <li style={styles.navItem}>
            <Link to="/signup" style={styles.navLink}>Log In</Link>
          </li>
        )}
      </ul>

      {/* Logout confirmation dialog */}
      {showConfirmLogout && (
        <div style={styles.confirmDialog}>
          <p>Are you sure you want to logout?</p>
          <button onClick={handleLogoutConfirm} style={styles.confirmButton}>Yes</button>
          <button onClick={handleLogoutCancel} style={styles.cancelButton}>No</button>
        </div>
      )}
    </nav>
  );
};

// Basic styles
const styles = {
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#333',
  },
  navItem: {
    margin: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '14px 20px',
    display: 'block',
  },
  navLinkActive: {
    backgroundColor: '#575757',
  },
  confirmDialog: {
    position: 'absolute',
    top: '50px',
    right: '20px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  confirmButton: {
    marginRight: '10px',
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default NavBar;
