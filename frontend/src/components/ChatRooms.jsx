import "../ChatRoom.css";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useState, useRef, useEffect } from "react";
import * as FiIcons from "react-icons/fi";
import ChatMessage from "./ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCFnJM6fGXJjchK1FV90BsHgXY-U8GG-RM",
  authDomain: "letsstudy.firebaseapp.com",
  projectId: "letsstudy",
  storageBucket: "letsstudy.appspot.com",
  messagingSenderId: "335899989868",
  appId: "1:335899989868:web:0da6aff72825a9b31e4549",
  measurementId: "G-5PQ22Q46RT",
});
const firestore = firebase.firestore();
// console.log("firestore", firestore);

export default function ChatRooms() {
  var access_token = localStorage.getItem("access_token");

  //   const snapshot = firestore().collection("participants").get(0);

  //   console.log("snapshot", snapshot);

  // const [user] = useAuthState(auth);
  const [user_id, setUserId] = useState(null);
  const [user_type_id, setUserTypeId] = useState(null);
  const [chats, setChats] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setUserId(res.data.id);
        setUserTypeId(res.data.user_type_id);
      });
  }, [access_token]);

  const dummy = useRef();
  const [formValue, setFormValue] = useState("");
  var messagesRef;

  useEffect(() => {
    console.log("chats=> ", chats);
  }, [chats]);

  //   useEffect(() => {
  //     console.log("image link=> ", image);
  //   }, [image]);

  useEffect(() => {
    console.log("user id=> ", user_id);
    console.log("user type id=> ", user_type_id);
    if (user_id && user_type_id) {
      console.log("in");

      messagesRef = firestore
        .collection("chats")
        .where("participants", "array-contains", user_id + "")
        // .orderBy("createdAt")
        // .limit(25)
        .onSnapshot((snapshot) => {
          console.log("test");
          const data = snapshot.docs;
          console.log("data that is saved into chats=> ", data);
          setChats(data);

          //   const querySnapshot = await getDocs(collection(db, "participants"));
          const querySnapshot = firestore.getDocs(
            collection(firestore.get, "participants")
          );
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        });
      //this query gets all the chat rooms for the current user where
      //chats is an array of objects:each object has an id:with this id we can get the participants or the messages
      //here we are searching for chats where the current user is one of the participants
      //that means the user already one of the members of the chat room (either sender or receiver)
      // const query = messagesRef.orderBy("createdAt").limit(25);

      //get user image
      //if the user is student=> fetch image from students
      //else if the user is a teacher => fetch the image from teachers table
      //setphotoURL;
      if (user_type_id === "0") {
        axios
          .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
            user_id: user_id,
          })
          .then((res) => {
            if (res.data.student[0].image_link) {
              setImage(res.data.student[0].image_link);
            }
          });
      } else if (user_type_id === "2") {
        axios
          .post(`http://127.0.0.1:8000/api/student/getTeacherById`, {
            user_id: user_id,
          })
          .then((res) => {
            if (res.data.teacher[0].image_link) {
              setImage(res.data.teacher[0].image_link);
            }
          });
      }
    }
  }, [user_id]);

  //   const sendMessage = async (e) => {
  //     e.preventDefault();

  //     //getting the logges in user

  //     //creating new document to the database
  //     await messagesRef.add({
  //       text: formValue,
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       user_id,
  //       image,
  //     });
  //     //dummy.current.scrollIntoView({ behavior: "smooth" });
  //     // setFormValue("");
  //   };

  return (
    <div className="chat-component">
      {/* <div className="AppChatRoom"> */}
      {/* <header></header> */}
      <section className="AppChatRoom-section">
        <section className="AppChatRoom-section">
          <main className="AppChatRoom-main">
            {/* {chats && chats.map((msg) => <div key={msg.id}>{msg} </div>)} */}
            {/* <div ref={dummy}></div> */}
          </main>
          {/* <form onSubmit={sendMessage} className="AppChatRoom-form">
              <input
                className="AppChatRoom-input"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
              />
              <button type="submit" className="AppChatRoom-button">
                <FiIcons.FiSend />
              </button>
            </form> */}
        </section>
      </section>
    </div>
    // </div>
  );
}
