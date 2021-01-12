import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

const HomePage = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  // useEffect(() => {
  //   onAuthUIStateChange((nextAuthState, authData) => {
  //     setAuthState(nextAuthState);
  //     setUser(authData);
  //     console.log("auth Data", authData);
  //   });
  // console.log(1);
  // }, []);

  return (
    <div className="homePage">
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
