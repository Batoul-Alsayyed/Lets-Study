import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCFnJM6fGXJjchK1FV90BsHgXY-U8GG-RM",
  authDomain: "letsstudy.firebaseapp.com",
  projectId: "letsstudy",
  storageBucket: "letsstudy.appspot.com",
  messagingSenderId: "335899989868",
  appId: "1:335899989868:web:0da6aff72825a9b31e4549",
  measurementId: "G-5PQ22Q46RT",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

// console.log("messaging object", messaging);
// messaging.getToken({
//   vapidKey:
//     "BKAbpp9HVWvwGJpUe105O84GmBW0_e6xi-eWyvTTF0C2Qm5R6j5TaBx93GHaw8U0EDA7311W5vTgNz6RPxpH5rc",
// });
export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BKAbpp9HVWvwGJpUe105O84GmBW0_e6xi-eWyvTTF0C2Qm5R6j5TaBx93GHaw8U0EDA7311W5vTgNz6RPxpH5rc",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
