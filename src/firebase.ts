import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const apikey = import.meta.env.VITE_API_KEY;


const firebaseConfig = {
  apiKey: apikey,
  authDomain: "cinematicview-474b1.firebaseapp.com",
  projectId: "cinematicview-474b1",
  storageBucket: "cinematicview-474b1.appspot.com",
  messagingSenderId: "210978371773",
  appId: "1:210978371773:web:6ae5c44b735b88bf2d5fd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;