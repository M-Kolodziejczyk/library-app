import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";
import Spinner from "../../components/Spinner/Spinner";

import "./NewPasswordPage.css";

const NewPasswordPage = props => {
  const defaultState = {
    username: props.match.params.username,
    code: "",
    newPassword: ""
  };
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    errorMessage,
    newPasswordSuccess,
    newPassword,
    loading,
    clearErrors
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

    if (!values.username) {
      errors.username = "Email address is required!";
    } else if (!/\S+@\S+\.\S+/.test(values.username)) {
      errors.username = "Email address is invalid";
    }

    if (!values.code) {
      errors.code = "Code is required!";
    }

    if (!values.newPassword) {
      errors.newPassword = "Password is required!";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password needs to be more than 6 characters!";
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
      newPassword(values);
    }

    // eslint-disable-next-line
  }, [errors, isSubmitting]);

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <div className="newPasswordPage">
      {loading && <Spinner />}
      <h1>New Password Page</h1>
      <div className="newPasswordPage__container">
        <div className="newPasswordPage__content">
          <h2>New Password</h2>
          <form onSubmit={handleSubmit} className="newPasswordPage__form">
            <div className="newPasswordPage__formGroup">
              <input
                className={`newPasswordPage__formGroupInput ${errors.username &&
                  "form-control is-invalid"} `}
                type="email"
                id="username"
                name="username"
                placeholder="Your Email"
                value={values.username}
                onChange={onChange}
              />
              {errors.username && (
                <label
                  className="newPasswordPage__formLabel"
                  htmlFor="username"
                >
                  {errors.username}
                </label>
              )}
            </div>
            <div className="newPasswordPage__formGroup">
              <input
                className={`newPasswordPage__formGroupInput ${errors.code &&
                  "form-control is-invalid"} `}
                type="text"
                id="code"
                name="code"
                placeholder="Confirm Code"
                value={values.code}
                onChange={onChange}
                autoFocus
              />
              {errors.code && (
                <label className="newPasswordPage__formLabel" htmlFor="code">
                  {errors.code}
                </label>
              )}
            </div>
            <div className="newPasswordPage__formGroup">
              <input
                className={`newPasswordPage__formGroupInput ${errors.code &&
                  "form-control is-invalid"} `}
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New password"
                value={values.newPassword}
                onChange={onChange}
              />
              {errors.newPassword && (
                <label className="newPasswordPage__formLabel" htmlFor="code">
                  {errors.newPassword}
                </label>
              )}
            </div>
            <div className="newPasswordPage__submitGroup">
              <Link to={`/signin`} className="newPasswordPage__submitGroupLink">
                Go to Signin Page
              </Link>
              <input
                type="submit"
                name="submit"
                placeholder="SUBMIT"
                className="newPasswordPage__submitGroupSubmit"
              />
            </div>
            {errorMessage && (
              <p className="newPasswordPage__errorMessage" htmlFor="submit">
                {errorMessage}
              </p>
            )}
            {newPasswordSuccess && (
              <p className="newPasswordPage__successMessage">
                Change Password Success!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
