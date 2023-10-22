// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todo-web-app-fm.firebaseapp.com",
  projectId: "todo-web-app-fm",
  storageBucket: "todo-web-app-fm.appspot.com",
  messagingSenderId: "458527880385",
  appId: "1:458527880385:web:1cc1466ed3a7b4e1fad040",
  measurementId: "G-DBPJ4FQQ32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();