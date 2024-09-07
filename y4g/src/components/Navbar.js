import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to highlight active link

const NavBar = () => {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link
            to="/"
            style={location.pathname === "/" ? styles.navLinkActive : styles.navLink}
          >
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            to="/events"
            style={location.pathname === "/events" ? styles.navLinkActive : styles.navLink}
          >
            Events
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            to="/about"
            style={location.pathname === "/about" ? styles.navLinkActive : styles.navLink}
          >
            About
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            to="/signup"
            style={location.pathname === "/signup" ? styles.navLinkActive : styles.navLink}
          >
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Basic styles with rounded corners and hover effects
const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '10px 20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  navLinkActive: {
    color: '#2c3e50',
    backgroundColor: '#ecf0f1',
    padding: '10px 20px',
    borderRadius: '20px',
  },
  navLinkHover: {
    backgroundColor: '#34495e',
  },
};

export default NavBar;
