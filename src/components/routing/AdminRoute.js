import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isLogged, loading, group } = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        !isLogged && !group.includes("Admin") && loading ? (
          <Redirect to="/signin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
