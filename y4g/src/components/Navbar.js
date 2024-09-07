import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { getDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../data/FirebaseConfig';
import '../css/NavBar.css';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setUserName(user.displayName);
      } else {
        const fetchUserName = async () => {
          try {
            const userDocRef = doc(FIRESTORE_DB, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setUserName(userData.firstName);
            }
          } catch (error) {
            console.error('Error fetching user data from Firestore:', error);
          }
        };
        fetchUserName();
      }
    }
  }, [user]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logoText">
          Youth4Good
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact className="nav-link" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/events" className="nav-link" activeClassName="active">Events</NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
        </li>
        <li>
          <NavLink to="/tutor" className="nav-link" activeClassName="active">Tutoring</NavLink>
        </li>
        <li>
          <NavLink to="/volunteer" className="nav-link" activeClassName="active">Volunteer</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav-link" activeClassName="active">Contact</NavLink>
        </li>
      </ul>
      <div className="userSection">
        {user ? (
          <div className="dropdown">
            <span 
              className="nav-link" 
              style={{ cursor: 'pointer' }} 
              onClick={handleDropdownToggle}
            >
              {userName ? userName : user.email.split('@')[0]}
            </span>
            <ul className={`dropdownMenu ${showDropdown ? 'show' : ''}`}>
              <li className="dropdownItem">
                <Link to="/profile" className="dropdownLink">Profile</Link>
              </li>
              <li className="dropdownItem" onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        ) : (
          <Link to="/signup" className="nav-link">Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
