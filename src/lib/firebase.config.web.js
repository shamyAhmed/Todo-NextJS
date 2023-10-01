// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUNWK3pWaSGznUOi4ayrfswcBYeLUBgTM",
  authDomain: "testing-36e7e.firebaseapp.com",
  projectId: "testing-36e7e",
  storageBucket: "testing-36e7e.appspot.com",
  messagingSenderId: "1094659611777",
  appId: "1:1094659611777:web:0b88f1b0446f44889e8180"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app
export const auth = getAuth(firebase_app);