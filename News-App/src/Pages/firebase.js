// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvszC0byfEiFnw-LCB_4ZiIcL9rR0tCCk",
  authDomain: "logical-line-391405.firebaseapp.com",
  projectId: "logical-line-391405",
  storageBucket: "logical-line-391405.appspot.com",
  messagingSenderId: "995083092900",
  appId: "1:995083092900:web:c352aed06af33344f4b731",
  measurementId: "G-MGZCYP7V33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
