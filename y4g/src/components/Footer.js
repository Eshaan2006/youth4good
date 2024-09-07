import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p style={styles.text}>© 2024 Youth4Good | All rights reserved</p>
        <ul style={styles.footerLinks}>
          <li><a href="/" style={styles.footerLink}>Home</a></li>
          <li><a href="/about" style={styles.footerLink}>About</a></li>
          <li><a href="/events" style={styles.footerLink}>Events</a></li>
          <li><a href="/signup" style={styles.footerLink}>Log In</a></li>
        </ul>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px 0',
    position: 'relative',
    bottom: 0,
    width: '100%',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    margin: '0',
    fontSize: '14px',
  },
  footerLinks: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  footerLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '14px',
    transition: 'color 0.3s ease',
  },
};

export default Footer;
