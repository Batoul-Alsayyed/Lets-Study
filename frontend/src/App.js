import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import StudentsSection from "./components/StudentsSection";
import Homepage from "./components/Homepage";
import BookNow from "./components/BookNow";
import Footer from "./components/Footer";
import Signup from "./components/Signin";
import Signin from "./components/Signup";
import Students from "./components/Students";
import Student from "./components/Student";
import LoginNavbar from "./components/LoginNavbar";
import Popup from "./components/Popup";
import MapComponent from "./components/MapComponent";
import TeacherProfile from "./components/TeacherProfile";
import StudentProfile from "./components/StudentProfile";
import PersonalProfile from "./components/PersonalProfile";
import PaymentForm from "./components/PaymentForm";
import AdminPanel from "./components/AdminPanel";
import AdminStudents from "./components/AdminStudents";
import AdminTeachers from "./components/AdminTeachers";
import AdminUsers from "./components/AdminUsers";
import AdminDegrees from "./components/AdminDegrees";
import AdminStudyFields from "./components/AdminStudyFields";
import ChatRoom from "./components/ChatRoom";
import AdminNavbar from "./components/AdminNavbar";
import { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import * as FiIcons from "react-icons/fi";
import { useState, useRef } from "react";
import ChatRooms2 from "./components/ChatRooms2";
import ChatRoom2 from "./components/ChatRoom2";
import Teachers from "./components/Teachers";
import React from "react";
import TeachersHomePage from "./components/TeachersHomePage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/header" element={<Header />}></Route>
          <Route path="/students-section" element={<StudentsSection />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/book" element={<BookNow />}></Route>
          <Route path="/footer" element={<Footer />}></Route>
          <Route path="/Signin" element={<Signup />}></Route>
          <Route path="/Signup" element={<Signin />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/teachers" element={<Teachers />}></Route>
          <Route path="/study" element={<Student />}></Route>
          <Route path="/login-navbar" element={<LoginNavbar />}></Route>
          <Route path="/popup" element={<Popup />}></Route>
          <Route path="/map" element={<MapComponent />}></Route>
          <Route path="/teacher-profile" element={<TeacherProfile />}></Route>
          <Route path="/student/:id" element={<StudentProfile />}></Route>
          <Route path="/PersonalProfile" element={<PersonalProfile />}></Route>
          <Route path="/payment" element={<PaymentForm />}></Route>
          <Route path="/admin" element={<AdminPanel />}></Route>
          <Route path="/admin-students" element={<AdminStudents />}></Route>
          <Route path="/admin-teachers" element={<AdminTeachers />}></Route>
          <Route path="/admin-users" element={<AdminUsers />}></Route>
          <Route path="/admin-degrees" element={<AdminDegrees />}></Route>
          <Route path="/chat-room" element={<ChatRoom />}></Route>
          <Route path="/chat-rooms2" element={<ChatRooms2 />}></Route>
          <Route path="/chat-room2/:id" element={<ChatRoom2 />}></Route>
          <Route path="/admin-navbar" element={<AdminNavbar />}></Route>
          <Route path="/thome" element={<TeachersHomePage />}></Route>
          <Route
            path="/admin-studyfields"
            element={<AdminStudyFields />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
