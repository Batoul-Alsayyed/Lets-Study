import "../ChatRoom.css";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useState, useRef, useEffect } from "react";
import * as FiIcons from "react-icons/fi";
import ChatMessage from "./ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCFnJM6fGXJjchK1FV90BsHgXY-U8GG-RM",
  authDomain: "letsstudy.firebaseapp.com",
  projectId: "letsstudy",
  storageBucket: "letsstudy.appspot.com",
  messagingSenderId: "335899989868",
  appId: "1:335899989868:web:0da6aff72825a9b31e4549",
  measurementId: "G-5PQ22Q46RT",
});
const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {
  var access_token = localStorage.getItem("access_token");

  // const [user] = useAuthState(auth);
  const [user_id, setUserId] = useState(null);
  const [chats, setChats] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setUserId(res.data.id);
      });
  }, [access_token]);
  const dummy = useRef();
  //this query gets all the chat rooms for the current user where
  //chats is an array of objects
  //each object has an id
  //with this id we can get the participants or the messages
  //here we are searching for chats where teh current user is one of the participants
  //that means the user already one of the members of the chat room (either sender or receiver)
  const messagesRef = firestore
    .collection("chats")
    .where("participants", "array-contains", user_id)
    .get((snapshot) => {
      const data = snapshot.docs.orderBy("createdAt").limit(25);
      setChats(data);
    });

  //query to get messages according to time sent and limiting their count to 25
  const query = messagesRef.orderBy("createdAt").limit(25);
  //listen to any updates in real time
  const [messages] = useCollectionData(query, { idField: { user_id } });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    //getting the logges in user
    const { uid, photoURL } = auth.currentUser;

    //creating new document to the database
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    dummy.current.scrollIntoView({ behavior: "smooth" });
    setFormValue("");
  };
  return (
    <div className="chat-component">
      <div className="AppChatRoom">
        <header></header>
        <section className="AppChatRoom-section">
          <section className="AppChatRoom-section">
            <main className="AppChatRoom-main">
              {messages &&
                messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}

              <div ref={dummy}></div>
            </main>
            <form onSubmit={sendMessage} className="AppChatRoom-form">
              <input
                className="AppChatRoom-input"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
              />
              <button type="submit" className="AppChatRoom-button">
                <FiIcons.FiSend />
              </button>
            </form>
          </section>
        </section>
      </div>
    </div>
  );
}
export default ChatRoom;
