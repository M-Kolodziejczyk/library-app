import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/HomePage/HomePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import BooksPage from "./pages/BooksPage/BooksPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Welcome from "./pages/Welcome/Welcome";

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { useAuthContext } from "./context/auth/AuthState";

import "./App.css";

function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  const { loadUser, isLogged } = useAuthContext();

  useEffect(() => {
    // loadUser();
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/welcome" component={Welcome} />

        <AmplifyAuthenticator>
          <Route exact path="/books" component={BooksPage} />
        </AmplifyAuthenticator>
      </Switch>
    </Router>
  );
}

export default App;
