// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDx6EryFebQeXJ372MzdVr_h6lwWIJMNvk",
    authDomain: "diplom-4cb3c.firebaseapp.com",
    projectId: "diplom-4cb3c",
    storageBucket: "diplom-4cb3c.appspot.com",
    messagingSenderId: "126749110453",
    appId: "1:126749110453:web:5c564650c5f5c4c6c5cefc",
    measurementId: "G-TB3EZD0M3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
