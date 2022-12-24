import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const apikey = import.meta.env.VITE_API_KEY;


const firebaseConfig = {
  apiKey: "AIzaSyCyZNxn-7ocxvfO4ndH0cedYcGcs6Ky0gU",
  authDomain: "reveal-com-ng.firebaseapp.com",
  projectId: "reveal-com-ng",
  storageBucket: "reveal-com-ng.appspot.com",
  messagingSenderId: "133089730908",
  appId: "1:133089730908:web:8cd9ca17d5136b38a5e199",
  measurementId: "G-0KCGS4DJ7T"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;