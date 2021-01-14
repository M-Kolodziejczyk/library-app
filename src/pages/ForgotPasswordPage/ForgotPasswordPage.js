import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";

import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    forgotPasswordSuccess,
    errorMessage,
    forgotPassword
  } = useAuthContext();

  const onChange = e => {
    setEmail(e.target.value);
  };

  const validate = value => {
    let errors = "";

    if (!value) {
      errors = "Email address is required!";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      errors = "Email address is invalid";
    }

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(email));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (errors.length === 0 && isSubmitting) {
      forgotPassword(email);
    }
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (forgotPasswordSuccess) {
      history.push(`/new-password/${email}`);
    }
  }, [forgotPasswordSuccess]);

  return (
    <div className="forgotPasswordPage">
      <h1>Forgot Password</h1>
      <div className="forgotPasswordPage__container">
        <div className="forgotPasswordPage__content">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit} className="forgotPasswordPage__form">
            <div className="forgotPasswordPage__formGroup">
              <input
                className={`forgotPasswordPage__formGroupInput ${errors &&
                  "form-control is-invalid"} `}
                type="email"
                id="username"
                name="username"
                placeholder="Your Email"
                value={email}
                onChange={onChange}
              />
              {errors && (
                <label
                  className="forgotPasswordPage__formLabel"
                  htmlFor="username"
                >
                  {errors}
                </label>
              )}
            </div>
            <div className="forgotPasswordPage__submitGroup">
              <Link
                to={`/confirm/${email}`}
                className="forgotPasswordPage__submitGroupLink"
              >
                Go to Confirm Page
              </Link>
              <input
                type="submit"
                name="submit"
                placeholder="SUBMIT"
                className="forgotPasswordPage__submitGroupSubmit"
              />
            </div>
            {errorMessage && (
              <p className="forgotPasswordPage__errorMessage" htmlFor="submit">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
