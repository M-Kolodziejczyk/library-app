import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";
import Spinner from "../../components/Spinner/Spinner";

import "./SigninPage.css";

const SigninPage = props => {
  const defaultState = {
    email: "",
    password: ""
  };
  const history = useHistory();
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    loginUser,
    loginFail,
    loginSuccess,
    errorMessage,
    loading
  } = useAuthContext();

  const onChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const validate = values => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email address is required!";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 6) {
      errors.password = "Password needs to be more than 6 characters!";
    }

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      loginUser(values);
      setValues(defaultState);
    }

    // eslint-disable-next-line
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (loginSuccess) {
      if (
        props.location &&
        props.location.state &&
        props.location.state.basket &&
        props.location.state.basket === true
      ) {
        console.log("basket");
      } else {
        history.push("/");
      }
    }

    // eslint-disable-next-line
  }, [loginSuccess, history]);

  return (
    <div className="signinPage">
      {loading && <Spinner />}
      <h1>Signin Page</h1>
      <div className="signinPage__container">
        <div className="signinPage__content">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit} className="signInPage__form">
            <div className="signinPage__formGroup">
              <input
                className={`signinPage__formGroupInput ${errors.email &&
                  "form-control is-invalid"} `}
                type="email"
                id="email"
                name="email"
                placeholder=" Your Email"
                value={values.email}
                onChange={onChange}
                autoComplete="username"
              />
              {errors.email && (
                <label className="singupPage__formLabel" htmlFor="email">
                  {errors.email}
                </label>
              )}
            </div>
            <div className="signinPage__formGroup">
              <input
                className={`signinPage__formGroupInput 
                ${errors.password && "form-control is-invalid"}`}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={onChange}
                autoComplete="current-password"
              />
              {errors.password && (
                <label className="singupPage__formLabel" htmlFor="password">
                  {errors.password}
                </label>
              )}
            </div>
            <div className="signinPage__formGroup">
              <input
                type="submit"
                value="SUBMIT"
                className="signinPage__formSubmit"
                placeholder="SUBMIT"
                name="submit"
              />
              {loginFail && (
                <label className="signinPage__formLabel" htmlFor="submit">
                  {errorMessage}
                </label>
              )}
            </div>
          </form>
          <div className="signinPage__containerLinks">
            <div className="signinPage__links">
              <p className="signinPage__register">
                Don't have account?{" "}
                <Link to="/signup" className="signinPage__link">
                  Signup Here
                </Link>
              </p>
              <Link to="/forgot-password" className="signinPage__link">
                Forgot password?
              </Link>
            </div>
            <Link to="/confirm" className="signinPage__link">
              Go to confirm account.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
