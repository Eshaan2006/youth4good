// src/data/FirebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrxSBwbWabEu6kylG85cwZVG11ih9T-6c",
  authDomain: "y4g-app.firebaseapp.com",
  projectId: "y4g-app",
  storageBucket: "y4g-app.appspot.com",
  messagingSenderId: "157419236079",
  appId: "1:157419236079:web:14df3f34910e1b8a10091a",
  measurementId: "G-5RQ1DLQZ87"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB };