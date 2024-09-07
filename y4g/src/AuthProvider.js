// src/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../data/FirebaseConfig';

const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the authenticated user
  const [loading, setLoading] = useState(true); // Loading state for auth status

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once user is set
    });

    // Unsubscribe on unmount
    return () => unsubscribe();
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  // Function to handle user logout
  const logout = async () => {
    await signOut(FIREBASE_AUTH);
  };

  // Auth context value to be used by consuming components
  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
