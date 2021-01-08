import React, { useState, useEffect } from "react";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import Signup from "../../components/Signup/Signup";

const SigninPage = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      console.log("auth Data", authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <h1>Hello, {user.attributes.name}</h1>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignOut />
      </AmplifyAuthenticator>
    </div>
  ) : (
    <AmplifyAuthenticator usernameAlias="email">
      <Signup />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
      <AmplifySignOut />
    </AmplifyAuthenticator>
  );
};

export default SigninPage;
