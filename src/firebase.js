// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth';
import {getFirestore } from 'firebase/firestore';
import {getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7kgTdyKB_Cff0VLqtp_M0BUKruGrKk2Q",
  authDomain: "academy-app-67212.firebaseapp.com",
  projectId: "academy-app-67212",
  storageBucket: "academy-app-67212.appspot.com",
  messagingSenderId: "952595307722",
  appId: "1:952595307722:web:8aa79b80b900a715186833",
  measurementId: "G-DFQ2K7BMEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {auth,storage,db};