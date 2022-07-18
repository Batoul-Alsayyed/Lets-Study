import React from "react";
import "../index.css";
import { AiOutlineClose } from "react-icons/ai";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <AiOutlineClose
          className="close-icon"
          onClick={props.handleClose}
        ></AiOutlineClose>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
