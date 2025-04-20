// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBravNT6hugMJmttdZNtfmIQLz8gfqgfb0",
  authDomain: "blazeshiftapp.firebaseapp.com",
  projectId: "blazeshiftapp",
  storageBucket: "blazeshiftapp.appspot.com",
  messagingSenderId: "458611007306",
  appId: "1:458611007306:web:85343d07173440737d6bb3"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const db = getFirestore(app);
export const functions = getFunctions(app, "us-central1");
export { app, messaging };
