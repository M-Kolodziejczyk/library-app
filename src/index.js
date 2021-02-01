import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import reportWebVitals from "./reportWebVitals";
import { AuthState } from "./context/auth/AuthState";
import { BookState } from "./context/book/BookState";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

ReactDOM.render(
  <AuthState>
    <BookState>
      <App />
    </BookState>
  </AuthState>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
