// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTT0AiDJhqWyWi5pGaRut1rxQAyy1lo0M",
  authDomain: "seusprecos-a905e.firebaseapp.com",
  projectId: "seusprecos-a905e",
  storageBucket: "seusprecos-a905e.appspot.com",
  messagingSenderId: "387008659842",
  appId: "1:387008659842:web:0ef48d75c13b990635cf9b",
  measurementId: "G-FMXGB52DC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
