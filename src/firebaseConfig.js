// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDptRhpROlFOOhsIlrWZw-UbWDzClXLm0c",
  authDomain: "surveyresponses-68b84.firebaseapp.com",
  projectId: "surveyresponses-68b84",
  storageBucket: "surveyresponses-68b84.firebasestorage.app",
  messagingSenderId: "287642644382",
  appId: "1:287642644382:web:7dc4e593151ce4d159308f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
