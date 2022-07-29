import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
const firestore = firebase.firestore();

firebase.initializeApp({
  apiKey: "AIzaSyCFnJM6fGXJjchK1FV90BsHgXY-U8GG-RM",
  authDomain: "letsstudy.firebaseapp.com",
  projectId: "letsstudy",
  storageBucket: "letsstudy.appspot.com",
  messagingSenderId: "335899989868",
  appId: "1:335899989868:web:0da6aff72825a9b31e4549",
  measurementId: "G-5PQ22Q46RT",
});

export { firebase, firestore };
