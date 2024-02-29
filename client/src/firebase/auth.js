// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "findur-estate.firebaseapp.com",
  projectId: "findur-estate",
  storageBucket: "findur-estate.appspot.com",
  messagingSenderId: "91090417834",
  appId: "1:91090417834:web:c16589e63020a4b991f8d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);