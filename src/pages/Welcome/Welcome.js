import React from "react";
import "./Welcome.css";

const Welcome = props => {
  return (
    <div>
      <h1>Register Success, </h1>
      <h5>Email was sent to: {props.location.state.user}</h5>
    </div>
  );
};

export default Welcome;
