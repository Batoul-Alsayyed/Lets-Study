import React from "react";
import img6 from "../images/Online Reading.png";
import SignupButton from "./SignupButton";
import coin from "../images/coin-svgrepo-com.svg";
export default function PaymentForm() {
  return (
    <div className="signin-layout">
      <div className="signin-left-display">
        <img className="signin-img payment-img" src={coin} alt="" />
      </div>
      <form className="signin-right-display">
        <p className="signin-welcome payment-text">Payment Form</p>
        <label className="signin-label payment">Card Number</label>
        <input className="signin-input" />
        <label className="signin-label">Expiration Date</label>
        <input className="signin-input" />
        <label className="signin-label">CVV</label>
        <input className="signin-input" />

        <label className="signin-label">Postal Code</label>
        <input className="signin-input" />

        <SignupButton type="submit" content={"confirm"}></SignupButton>
      </form>
    </div>
  );
}
