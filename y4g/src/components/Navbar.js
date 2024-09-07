// src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router for navigation

const NavBar = () => {
  return (
    <nav>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
        <li style={styles.navItem}><Link to="/events" style={styles.navLink}>Events</Link></li>
        <li style={styles.navItem}><Link to="/about" style={styles.navLink}>About</Link></li>
        <li style={styles.navItem}><Link to="/signup" style={styles.navLink}>Log In</Link></li>
        {/* Add more links as needed */}
      </ul>
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
};

export default NavBar;