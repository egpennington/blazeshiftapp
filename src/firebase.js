// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBravNT6hugMJmttdZNtfmIQLz8gfqgfb0",
    authDomain: "blazeshiftapp.firebaseapp.com",
    projectId: "blazeshiftapp",
    storageBucket: "blazeshiftapp.firebasestorage.app",
    messagingSenderId: "458611007306",
    appId: "1:458611007306:web:85343d07173440737d6bb3"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
