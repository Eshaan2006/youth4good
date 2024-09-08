import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from './data/FirebaseConfig';

const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the authenticated user
  const [loading, setLoading] = useState(true); // Loading state for auth status

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
      if (currentUser) {
        // Fetch user role from Firestore
        const userDocRef = doc(FIRESTORE_DB, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUser({ ...currentUser, role: userData.role }); // Include role in the user object
        } else {
          setUser({ ...currentUser, role: 'Volunteer' }); // Default role if no document found
        }
      } else {
        setUser(null); // No user logged in
      }

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
    setUser(null); // Clear user state on logout
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
