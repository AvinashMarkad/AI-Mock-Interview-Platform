import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUaUKq7Mqs8BXOQ-mAp3tunfin6JZSD0Q",
  authDomain: "prepwise-accc1.firebaseapp.com",
  projectId: "prepwise-accc1",
  storageBucket: "prepwise-accc1.firebasestorage.app",
  messagingSenderId: "589983350927",
  appId: "1:589983350927:web:433b9be4c6b11dd09730fa",
  measurementId: "G-KZQCN1ZS2V",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
