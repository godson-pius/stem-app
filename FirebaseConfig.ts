// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAMTwrIxXY_23hicY7oqudlRMV-Jdvn5s",
    authDomain: "stem-8eb29.firebaseapp.com",
    projectId: "stem-8eb29",
    storageBucket: "stem-8eb29.firebasestorage.app",
    messagingSenderId: "42066670555",
    appId: "1:42066670555:web:4862d7a8602a58b5e16dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);