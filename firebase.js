// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {getFirestore} from "firebase/firestore"
import { getAuth} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB1W5fTUgMC8Tf0lctXBzxV7mC2hmn5xs",
  authDomain: "react-contact-507df.firebaseapp.com",
  databaseURL: "https://react-contact-507df-default-rtdb.firebaseio.com",
  projectId: "react-contact-507df",
  storageBucket: "react-contact-507df.appspot.com",
  messagingSenderId: "933798942141",
  appId: "1:933798942141:web:9e05fbfd2ac0eeff9aeed4",
  measurementId: "G-JKBW814XKC"
};



// Initialize Firebase
//  const app = initializeApp(firebaseConfig);


firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export   const auth = firebase.auth();
export  const firestore = firebase.firestore();

