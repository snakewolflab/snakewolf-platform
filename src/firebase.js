// src/firebase.js
// import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeYmLNmYRxPt2pUaLMuvyT-VjiNrK05bg",
  authDomain: "snakewolf-platform.firebaseapp.com",
  projectId: "snakewolf-platform",
  storageBucket: "snakewolf-platform.firebasestorage.app",
  messagingSenderId: "841028122005",
  appId: "1:841028122005:web:efed6d7c8d0fa36890b29c",
  measurementId: "G-ZSQBRQC4DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = firebaseConfig.appId;