import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBJg3QEuw9bH0mUfKoYDLPPAwcXux7UqAQ",
    authDomain: "android-app-3f01b.firebaseapp.com",
    projectId: "android-app-3f01b",
    storageBucket: "android-app-3f01b.firebasestorage.app",
    messagingSenderId: "943505236628",
    appId: "1:943505236628:web:d41376c1c0e4dc9a154a81",
    measurementId: "G-T9XZDV5EWP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;