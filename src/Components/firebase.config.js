
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD2JamBl5sij2bjW2eWurmEX1doznKaBHg",
  authDomain: "organizo-8b5a2.firebaseapp.com",
  projectId: "organizo-8b5a2",
  storageBucket: "organizo-8b5a2.firebasestorage.app",
  messagingSenderId: "748821090631",
  appId: "1:748821090631:web:36964f204b0d39cc3b7c62"
};

 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;