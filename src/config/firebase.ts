// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Not used yet
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDONMuDQQ5PDEUw1spUuj9E24uuwhsAVTA",
  authDomain: "millennial-c1113.firebaseapp.com",
  projectId: "millennial-c1113",
  storageBucket: "millennial-c1113.firebasestorage.app",
  messagingSenderId: "945543627436",
  appId: "1:945543627436:web:91ad54879340177e541509",
  measurementId: "G-C6W71E9E86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Analytics not used yet

// Initialize Firestore
export const db = getFirestore(app)

export default app 