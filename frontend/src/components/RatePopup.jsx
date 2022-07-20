import React from "react";
import "../index.css";
import { AiOutlineClose } from "react-icons/ai";

const Popup = (props) => {
  return (
    <div className="popup-box2">
      <div className="box2">
        <AiOutlineClose
          className="close-icon2"
          onClick={props.handleClose}
        ></AiOutlineClose>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
