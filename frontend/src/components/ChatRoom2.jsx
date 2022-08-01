import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore, firebase } from "../Firebase";
import * as FiIcons from "react-icons/fi";
import { FcUndo } from "react-icons/fc";
export default function ChatRoom2() {
  const [formValue, setFormValue] = useState("");
  const [chats, setChats] = useState([]);
  var user_id = localStorage.getItem("user_id");
  let chat_id = useParams().id;
  const dummy = useRef();
  let navigate = useNavigate();
  useEffect(() => {
    if (!chats.length) {
      getChats();
    }
  }, [chats]);

  const undoClickHandler = (e) => {
    e.preventDefault();
    navigate("/chat-rooms2");
  };

  function getChats() {
    console.log("id", chat_id);
    firestore
      .collection("chats")
      .doc(chat_id)
      .collection("messages")
      .orderBy("createdAt")
      .limit(25)
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs;
        console.log("messages", messages);
        setChats([]);
        messages.map((message) => {
          // console.log(message.data());
          // console.log("message", message.data());
          // const cr = message.createdAt.toDate().toString();

          setChats((chats) => [
            ...chats,
            {
              text: message.data().text,
              createdAt: message.data().createdAt,
              sender: message.data().sender,
            },
          ]);
        });
      });
  }
  const sendMessage = async (e) => {
    e.preventDefault();
    const messagesRef = firestore
      .collection("chats")
      .doc(chat_id)
      .collection("messages");
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      sender: user_id,
    });
    // setChats([]);
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log(("value", formValue));
  }, [formValue]);

  // if (chats.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="chat-component">
      <section className="AppChatRoom-section">
        <section className="AppChatRoom-section">
          <main className="AppChatRoom-main">
            <span className="undo-icon" onClick={undoClickHandler}>
              <FcUndo />
            </span>
            <p className="title-chat"> Chat Room</p>
            {chats &&
              chats.map((chat) => {
                console.log("chat inside ", chat.text);
                if (chat.sender === user_id) {
                  return (
                    <div className="display-right">
                      <p className="right-display">{chat.text}</p>
                      <div ref={dummy}></div>
                    </div>
                  );
                }
                return (
                  <div className="display-left">
                    <p className="left-display">{chat.text}</p>
                  </div>
                );
              })}
            <div ref={dummy}></div>
          </main>
        </section>
      </section>
      <form className="AppChatRoom-form" onSubmit={sendMessage}>
        <input
          value={formValue}
          placeholder="write your message here"
          className="AppChatRoom-input"
          onChange={(e) => setFormValue(e.target.value)}
        ></input>
        <button type="submit" className="AppChatRoom-button">
          <FiIcons.FiSend />
        </button>
      </form>
    </div>
  );
}
