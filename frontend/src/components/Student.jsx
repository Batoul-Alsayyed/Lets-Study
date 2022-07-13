import React, { useState } from "react";
import Popup from "./Popup";
import LoginNavbar from "./LoginNavbar";
import "../index.css";

export default function Student() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <LoginNavbar />
      {/* Now adding the popup that will let the student to finish his/her profile */}

      <input type="button" value="Click to Open Popup" onClick={togglePopup} />
      {isOpen && (
        <Popup
          content={
            <>
              <div className="popup-div">
                <p>Finish Your Profile</p>
                <br />
                <form className="form">
                  <div className="row">
                    <div className="column">
                      <label htmlFor="">Interested Field</label>
                      <input type="text" />
                    </div>

                    <div className="column">
                      <label htmlFor="">Study Field</label>
                      <input type="text" />
                    </div>

                    <div className="column">
                      <label htmlFor="">Type of Degree</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="row2">
                      <label htmlFor="" className="location-text">Location</label>

                    <div className="column">
                      <button className="col-btn">Current position </button>
                    </div>

                    <div className="column">
                      <button className="col-btn btn2">Find on the map</button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
