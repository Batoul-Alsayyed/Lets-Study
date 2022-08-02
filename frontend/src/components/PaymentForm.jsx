import React, { useState } from "react";
import img6 from "../images/Online Reading.png";
import SignupButton from "./SignupButton";
import coin from "../images/coin-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function PaymentForm() {
  const user_id = localStorage.getItem("user_id");
  let navigate = useNavigate();
  const [payment_form, setPaymentForm] = useState({
    card_number: "",
    expiration_date: "",
    cvv: "",
    postal_code: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("card number value now=> ", payment_form.card_number);
    console.log("exp value now=> ", payment_form.expiration_date);
    console.log("cvv number value now=> ", payment_form.cvv);
    console.log("postal number value now=> ", payment_form.postal_code);
    if (
      payment_form.card_number != "" &&
      payment_form.expiration_date != "" &&
      payment_form.cvv != "" &&
      payment_form.postal_code != ""
    ) {
      axios
        .get(
          `http://127.0.0.1:8000/api/student/updateAccountType?user_id=` +
            user_id
        )
        .then((res) => {
          toast.success("Congratulations you are a pro member now!!!");
        })
        .catch((err) => {
          toast.error(
            "There was an error with your card. Please contact your bank."
          );
        });
      navigate("/teachers");
    } else {
      toast.error("Pleade fill all card info");
    }
  };

  return (
    <div className="signin-layout">
      <div className="signin-left-display">
        <img className="signin-img payment-img" src={coin} alt="" />
      </div>
      <form className="signin-right-display" onSubmit={submitHandler}>
        <p className="signin-welcome payment-text">Payment Form</p>
        <label className="signin-label payment">Card Number</label>
        <input
          className="signin-input"
          onChange={(e) =>
            setPaymentForm({ ...payment_form, card_number: e.target.value })
          }
        />
        <label className="signin-label">Expiration Date</label>
        <input
          className="signin-input"
          onChange={(e) =>
            setPaymentForm({ ...payment_form, expiration_date: e.target.value })
          }
        />
        <label className="signin-label">CVV</label>
        <input
          className="signin-input"
          onChange={(e) =>
            setPaymentForm({ ...payment_form, cvv: e.target.value })
          }
        />

        <label className="signin-label">Postal Code</label>
        <input
          className="signin-input"
          onChange={(e) =>
            setPaymentForm({ ...payment_form, postal_code: e.target.value })
          }
        />

        <SignupButton
          type="submit"
          content={"confirm"}
          className="payment"
        ></SignupButton>
      </form>
    </div>
  );
}
