import React from "react";
import { requestForToken } from "../FirebaseMessaging";

const Notification = () => {
  requestForToken();
};
export default requestForToken();
