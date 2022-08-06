import React, { useState, useEffect } from "react";
import RatePopup from "./RatePopup";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import LoginNavbar from "../components/LoginNavbar";
import { RiStarFill } from "react-icons/ri";
import { BsChatQuote } from "react-icons/bs";
import axios from "axios";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
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

export default function StudentProfile() {
  let navigate = useNavigate();
  let user_id = localStorage.getItem("user_id");
  const [rating, setRating] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [has_room, setHasRoom] = useState(false);
  const [done, setDoneSearch] = useState(false);
  let partner_id = useParams().id;
  // console.log("partner id", partner_id);
  const ratingChanged = (newRating) => {
    //console.log("new rating", newRating);
    setRating(newRating);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    age: 0,
    date_of_birth: "",
    rate_number: "",
    email: "",
  });
  const [info, setInfo] = useState({
    image_link: "",
    rate_number: "",
  });

  let { id } = useParams();
  // console.log({ id }.id);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  function chatWith() {
    setClicked(true);
    // alert("clicked");
    //now we have to check if there is a room between the current user and the targeted user\
    const messagesRef = firestore
      .collection("chats")
      .where("participants", "array-contains", String(user_id)) //getting all user chats
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("chat participant1=>", doc.data().participants[0]);
          console.log("chat particpant 2=>", doc.data().participants[1]);
          if (
            // if the user has a chat with the clicked user then get chat id of this chat and call chatroom2 with chat id as a param
            doc.data().participants[0] === partner_id ||
            doc.data().participants[1] === partner_id
          ) {
            console.log("The user has a chat with ", partner_id);
            console.log("Chat id=> ", doc.id);
            setHasRoom(true);
            let url = "/chat-room2/" + doc.id;
            navigate(url);
          }
        });
        setDoneSearch(true);
      });
  }
  useEffect(() => {
    console.log("done looping", done);
    if (done) {
      console.log("has room=>", has_room);
      console.log("clicked=>", clicked);
      if (clicked && !has_room) {
        console.log("The user has no chats with the clicked user ");
        //now we are sure the user has no chats with the clicked user =>
        //so we have to create a new room then navigate to this chat room
        const chats = firestore.collection("chats");
        //add a new chat room where participants are the current user and the clicked user

        chats
          .add({
            participants: [user_id, partner_id],
          })
          .then((doc) => {
            console.log("doc id, ", doc.id);
            // localStorage.setItem("partner_email",);
            console.log("partner email => ", user.email);
            let url = "/chat-room2/" + doc.id;
            navigate(url);
          });

        // let url = "/chat-room2/" + doc.id;
        // navigate(url);
      }
    }
  }, [done]);
  const rateClicked = (e) => {
    e.preventDefault();
    togglePopup();
  };
  const submit_rate = (e) => {
    e.preventDefault();
    //save rated stars to updateRateNumberByUserId API
    axios
      .post(`http://127.0.0.1:8000/api/user/add_rating`, {
        user_id: { id }.id,
        rate_number: rating,
      })
      .then((res) => {
        axios
          .post(`http://127.0.0.1:8000/api/user/updateRateNumberByUserId`, {
            user_id: { id }.id,
          })
          .then((res) => {
            // console.log(res.data);
            toast.success("Rating added successfully");
          });
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Error occured please try again");
      });
    togglePopup();
  };
  function getName() {
    // console.log();

    axios
      .post(`http://127.0.0.1:8000/api/user/getUserById`, {
        id: { id }.id,
      })
      .then((res) => {
        //  console.log(res.data.user);
        setUser({
          ...user,
          name: res.data.user[0].name,
          date_of_birth: res.data.user[0].date_of_birth,
          email: res.data.user[0].email,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  function getInfo() {
    // console.log();
    // if ( === "0") {

    axios
      .post(`http://127.0.0.1:8000/api/student/ifStudent`, {
        user_id: { id }.id,
      })
      .then((res) => {
        console.log(res.data.response);
        if (res.data.response === true) {
          //user is a student
          axios
            .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
              user_id: { id }.id,
            })
            .then((res) => {
              console.log("student=>", res.data.student[0].image_link);
              setInfo({
                ...info,
                image_link: res.data.student[0].image_link,
                rate_number: parseInt(res.data.student[0].rate_number),
              });
              console.log(
                "res.data.student[0].rate_number",
                res.data.student[0].rate_number
              );
            });
        } else {
          //user is a tutor
          axios
            .post(`http://127.0.0.1:8000/api/teacher/getTeacherById`, {
              user_id: { id }.id,
            })
            .then((res) => {
              setInfo({
                ...info,
                image_link: res.data.teacher[0].image_link,
                rate_number: parseInt(res.data.teacher[0].rate_number),
              });
              console.log(
                "res.data.teacher[0].rate_number",
                res.data.teacher[0].rate_number
              );
            });
        }
      });

    // }
    // else if ( === "2") {
    //   axios
    //     .post(`http://127.0.0.1:8000/api/teacher/getTeacherById`, {
    //       user_id: { id }.id,
    //     })
    //     .then((res) => {
    //       setInfo({
    //         ...info,
    //         image_link: res.data.teacher[0].image_link,
    //         rate_number: parseInt(res.data.teacher[0].rate_number),
    //       });
    //       console.log(
    //         "res.data.teacher[0].rate_number",
    //         res.data.teacher[0].rate_number
    //       );
    //     });
    // }
  }
  function getAge() {
    if (user.date_of_birth) {
      //   console.log(user.date_of_birth);
      var currentDate = new Date();
      // console.log(currentDate);
      var currentYear = currentDate.getFullYear();
      // console.log(currentYear);
      const year_born = user.date_of_birth.split("-")[0];
      // console.log("year born ", year_born);
      var age = currentYear - year_born;
      // console.log("age: ", age);
      setUser({ ...user, age: age });
    }
  }
  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    getAge();
    getInfo();
  }, [user.date_of_birth]);

  return (
    <div>
      <LoginNavbar />

      {isOpen && (
        <RatePopup
          content={
            <div className="pop-up">
              <h1 className="rate-text">Rate {user.name}</h1>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={60}
                activeColor="#ffd700"
              />
              <div>
                <button className="submit-pop-up" onClick={submit_rate}>
                  Submit
                </button>
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}

      <p className="student-profile-title">{user.name} profile</p>
      <div className="student-profile">
        <div className="student-profile-content">
          <div>
            Name: <span className="user-email">{user.name}</span>
          </div>
          <div>
            Age: <span className="user-email">{user.age} years old</span>
          </div>
          <div>
            Rating:
            <span className="rate-stars" id="icons">
              {[...Array(info.rate_number)].map((elementInArray, index) => {
                return <RiStarFill className="star" />;
              })}
            </span>
          </div>
          <div>
            Email: <span className="user-email">{user.email}</span>{" "}
            <span className="chat-icon">
              <BsChatQuote onClick={chatWith} />
            </span>
          </div>
        </div>
        <div className="student-profile-content">
          <img src={info.image_link} className="student-profile-img" />
        </div>
      </div>
      <div className="centered">
        <button className="rate-btn" onClick={rateClicked}>
          Rate {user.name}
        </button>
      </div>
    </div>
  );
}
{
  /* <div>Location: Beirut, Lebanon</div> */
}
