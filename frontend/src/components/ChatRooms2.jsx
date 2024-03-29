import React from "react";
import axios from "axios";
import LoginNavbar from "../components/LoginNavbar";
import { useState, useEffect } from "react";
import prof from "../images/christopher-campbell-rDEOVtE7vOs-unsplash 1.png";
import "../index.css";
import { firestore } from "../Firebase";
import { useNavigate } from "react-router-dom";

function ChatRooms2() {
  var access_token = localStorage.getItem("access_token");
  const [img, setImg] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatrooms, setChatRooms] = useState([]);
  var user_id = localStorage.getItem("user_id");

  let navigate = useNavigate();

  function NavigateToChatRoom(chat_id, partner_email) {
    let url = "/chat-room2/" + String(chat_id);
    localStorage.setItem("partner_email", partner_email);
    navigate(url);
  }
  function getChatRooms() {
    if (user_id) {
      const rooms = []; //rooms will save the user id the user is talking to
      const messagesRef = firestore
        .collection("chats")
        .where("participants", "array-contains", String(user_id))
        .get()
        .then((querySnapshot) => {
          const chatIDS = [];
          querySnapshot.forEach((doc) => {
            console.log("participants", doc.data());
            console.log("id=>", user_id);
            var chatroom = doc.data().participants;
            chatroom.map((user) => {
              if (user !== user_id) {
                var username;
                axios
                  .post(`http://127.0.0.1:8000/api/user/getUserById`, {
                    id: user,
                  })
                  .then((res) => {
                    const id = res.data.user[0].id;
                    username = res.data.user[0].name;
                    console.log("email", res.data.user[0].email);
                    console.log("user type id ", res.data.user[0].user_type_id);
                    let email = res.data.user[0].email;
                    if (res.data.user[0].user_type_id === 0) {
                      axios
                        .post(
                          `http://127.0.0.1:8000/api/student/getStudentById`,
                          {
                            user_id: res.data.user[0].id,
                          }
                        )
                        .then((res) => {
                          setChatRooms((chatrooms) => [
                            ...chatrooms,
                            {
                              name: username,
                              image: res.data.student[0].image_link,
                              email: email,
                            },
                          ]);
                        });
                    } else if (res.data.user[0].user_type_id === 2) {
                      axios
                        .post(
                          `http://127.0.0.1:8000/api/teacher/getTeacherById`,
                          {
                            user_id: res.data.user[0].id,
                          }
                        )
                        .then((res) => {
                          setChatRooms((chatrooms) => [
                            ...chatrooms,
                            {
                              name: username,
                              image: res.data.teacher[0].image_link,
                              email: email,
                            },
                          ]);
                        });
                    }
                  });
              }
            });
            chatIDS.push(`${doc.id}`);
          });
          console.log("Chat Ids array =>", chatIDS.join(", "));
          setChats(chatIDS);
        });
    }
  }

  useEffect(() => {
    console.log("chatrooms: ", chatrooms);
  }, [chatrooms]);

  useEffect(() => {
    if (user_id && access_token) {
      getChatRooms();
    }
  }, [user_id, access_token]);
  return (
    <div className="rooms">
      <LoginNavbar />
      <div className="chats-room">
        <div className="contacts-chat">
          {chats &&
            chats.map((chat, index) => (
              <div>
                <div
                  key={chat}
                  className="chat-id"
                  onClick={() =>
                    NavigateToChatRoom(chat, chatrooms[index]?.email)
                  }
                >
                  {!chatrooms ? null : (
                    <div className="chat-id-div">
                      <img src={chatrooms[index]?.image} className="chat-img" />

                      <p className="contact-name">{chatrooms[index]?.name}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default ChatRooms2;
