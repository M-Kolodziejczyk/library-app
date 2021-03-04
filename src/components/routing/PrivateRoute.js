import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged, loadingUser } = useAuthContext();

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingUser) {
      setLoading(false);
    }

    if (isLogged) {
      setIsAuth(true);
    }
  }, [isLogged, loadingUser]);

  if (loading) {
    return 0;
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          !isAuth ? <Redirect to="/signin" /> : <Component {...props} />
        }
      />
    );
  }
};

export default PrivateRoute;
