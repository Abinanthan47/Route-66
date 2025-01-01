// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-shortz.firebaseapp.com",
  projectId: "ai-shortz",
  storageBucket: "ai-shortz.appspot.com",
  messagingSenderId: "31588274637",
  appId: "1:31588274637:web:bd727061672b2e457c3484"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);