// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 Paste your config object from Step 2 below
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_bucket",
  messagingSenderId: "your_msg_sender_id",
  appId: "your_app_id",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
