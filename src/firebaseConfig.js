import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyAYA4y9ly0t52l7nLxocTWHJFECkhwfvoU",
  
    authDomain: "smartagrimatch-58d83.firebaseapp.com",
  
    projectId: "smartagrimatch-58d83",
  
    storageBucket: "smartagrimatch-58d83.firebasestorage.app",
  
    messagingSenderId: "1017828203300",
  
    appId: "1:1017828203300:web:503645a7ebf5f3a351f1b1",
  
    measurementId: "G-XDZRT79LSL"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
