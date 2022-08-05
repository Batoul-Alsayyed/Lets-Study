import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore, firebase } from "../Firebase";
import * as FiIcons from "react-icons/fi";
import { FcUndo } from "react-icons/fc";
import emailjs from "@emailjs/browser";
import axios from "axios";
export default function ChatRoom2() {
  const form = useRef();
  let access_token = localStorage.getItem("access_token");
  let partner_email = localStorage.getItem("partner_email");

  const [formValue, setFormValue] = useState("");
  const [chats, setChats] = useState([]);
  var user_id = localStorage.getItem("user_id");
  let chat_id = useParams().id;
  const dummy = useRef();
  let navigate = useNavigate();
  const [user_name, setUserName] = useState("");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        // user_name = res.data.name;
        // console.log("user name", user_name);
        setUserName(res.data.name);
      });
  }, [user_id]);
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
    console.log("userrrrrr", user_name);
    console.log("message content: ", formValue);
    console.log("email: ", partner_email);
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
    //sending an email to patner containing message content and sender name
    emailjs
      .sendForm(
        "service_4pgu0ik",
        "template_muajx8e",
        form.current,
        "933ZqnxRcV8AqmKzM"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log(("value", formValue));
  }, [formValue]);

  return (
    <>
      <form ref={form} onSubmit={sendMessage} className="display-form">
        <label>Name</label>
        <input type="text" name="user_name" value={user_name} />
        <label>Email</label>
        <input type="email" name="user_email" value={partner_email} />
        <label>Message</label>
        <textarea name="message" value={formValue} />
        <input type="submit" value="Send" />
      </form>

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
    </>
  );
}
