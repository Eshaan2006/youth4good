import { initializeApp, firebase } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
