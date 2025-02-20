import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCY51w0BaxLhIs7cNdJibyV0h_E6_e9T4g",
    authDomain: "app-android-838b9.firebaseapp.com",
    projectId: "app-android-838b9",
    storageBucket: "app-android-838b9.firebasestorage.app",
    messagingSenderId: "40403319273",
    appId: "1:40403319273:android:5a2e05a24ee78c65bcf378",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;