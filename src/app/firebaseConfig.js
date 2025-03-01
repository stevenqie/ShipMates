// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgHRNgdN0w_YrO-Y0BXmo1lo1RPh38Uls",
  authDomain: "hack-illinois-2025.firebaseapp.com",
  projectId: "hack-illinois-2025",
  storageBucket: "hack-illinois-2025.firebasestorage.app",
  messagingSenderId: "684147221014",
  appId: "1:684147221014:web:1945b04c96cd9ca5494b37",
  measurementId: "G-EKT1DWXKFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);