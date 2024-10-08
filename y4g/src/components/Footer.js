import React from 'react';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Import the icons

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p style={styles.text}>© 2024 Youth4Good | All rights reserved</p>
        <ul style={styles.footerLinks}>
          <li><a href="/" style={styles.footerLink}>Home</a></li>
          <li><a href="/about" style={styles.footerLink}>About</a></li>
          <li><a href="/events" style={styles.footerLink}>Events</a></li>
          <li><a href="/tutor" style={styles.footerLink}>Tutoring</a></li>
          <li><a href="/volunteer" style={styles.footerLink}>Volunteer</a></li>
          <li><a href="/contact" style={styles.footerLink}>Contact</a></li>
          <li><a href="/signup" style={styles.footerLink}>Log In</a></li>
        </ul>
        <div style={styles.socialMediaIcons}>
        <a href="https://www.instagram.com/youth_4_good" target="_blank" rel="noopener noreferrer" className="socialIcon">
          <FaInstagram size={24} />
        </a>
        <a href="https://www.linkedin.com/company/youth4good-non-profit/" target="_blank" rel="noopener noreferrer" className="socialIcon">
          <FaLinkedin size={24} />
        </a>
        <a href="https://www.youtube.com/@youth4good" target="_blank" rel="noopener noreferrer" className="socialIcon">
          <FaYoutube size={24} />
          </a>
        </div>
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
  socialMediaIcons: {
    display: 'flex',
    gap: '10px',
  },
  socialIcon: {
    color: '#ecf0f1',
    transition: 'color 0.3s ease',
  },
};

export default Footer;
