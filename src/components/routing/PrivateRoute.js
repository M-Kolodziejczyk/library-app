import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged, loading } = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        !isLogged && loading ? (
          <Redirect to="/signin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
