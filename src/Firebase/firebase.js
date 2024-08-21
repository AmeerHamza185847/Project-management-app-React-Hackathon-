import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrY_PAdyB2qFdYE2TGOEnfmRPVaf7e-gs",
  authDomain: "react-hackathon-todo-app.firebaseapp.com",
  projectId: "react-hackathon-todo-app",
  storageBucket: "react-hackathon-todo-app.appspot.com",
  messagingSenderId: "353744345829",
  appId: "1:353744345829:web:20b2adad5e8425197e520c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);