// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOR5KdPGtzG3QKHctSQZ2dZNDUK5YdNt4",
  authDomain: "unichamba-ues.firebaseapp.com",
  projectId: "unichamba-ues",
  storageBucket: "unichamba-ues.appspot.com",
  messagingSenderId: "139568571677",
  appId: "1:139568571677:web:bb99f1fb2520a105c4edf4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);

// Initialize firebase authentication 
export const auth = getAuth(app);
export {db, storage};