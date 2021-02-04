import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/HomePage/HomePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import BooksPage from "./pages/BooksPage/BooksPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ConfirmPage from "./pages/ConfirmPage/ConfirmPage";
import ResendcodePage from "./pages/ResendcodePage/ResendcodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import UserPage from "./pages/UserPage/UserPage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import Welcome from "./pages/Welcome/Welcome";
import BookPage from "./pages/BookPage/BookPage";

import PrivateRoute from "./components/routing/PrivateRoute";
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
        <Route exact path="/confirm" component={ConfirmPage} />
        <Route exact path="/resendcode" component={ResendcodePage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route
          exact
          path="/new-password/:username"
          component={NewPasswordPage}
        />
        <Route exact path="/new-password" component={NewPasswordPage} />
        <PrivateRoute exact path="/user" component={UserPage} />

        <Route exact path="/books" component={BooksPage} />
        <Route exact path="/book/:id" component={BookPage} />
      </Switch>
    </Router>
  );
}

export default App;
