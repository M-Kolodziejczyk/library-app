import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/HomePage/HomePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import BooksPage from "./pages/BooksPage/BooksPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ConfirmPage from "./pages/ConfirmPage/ConfirmPage";
import Welcome from "./pages/Welcome/Welcome";

import { useAuthContext } from "./context/auth/AuthState";

import "./App.css";

function App() {
  const { loadUser } = useAuthContext();

  useEffect(() => {
    if (localStorage["amplify-authenticator-authState"] === "signedIn") {
      loadUser();
    }

    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/confirm/:username" component={ConfirmPage} />

        <Route exact path="/books" component={BooksPage} />
      </Switch>
    </Router>
  );
}

export default App;
