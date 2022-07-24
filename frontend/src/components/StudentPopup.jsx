import React from "react";
import "../index.css";
import { AiOutlineClose } from "react-icons/ai";

const StudentPopup = (props) => {
  return (
    <div className="popup-box">
      <div className="box3">
        <AiOutlineClose
          className="close-icon3"
          onClick={props.handleClose}
        ></AiOutlineClose>
        {props.content}
      </div>
    </div>
  );
};

export default StudentPopup;
