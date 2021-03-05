import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";
import Spinner from "../../components/Spinner/Spinner";

import "./ConfirmPage.css";

const ConfirmPage = props => {
  const defaultState = {
    username: props.match.params.username,
    code: ""
  };
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    errorMessage,
    confirmRegister,
    confirmRegisterUser,
    clearErrors,
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

    if (!values.username) {
      errors.username = "Email address is required!";
    } else if (!/\S+@\S+\.\S+/.test(values.username)) {
      errors.username = "Email address is invalid";
    }

    if (!values.code) {
      errors.code = "Code is required!";
    }

    return errors;
  };

  const handleConfirm = e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      confirmRegisterUser(values);
    }

    // eslint-disable-next-line
  }, [errors, isSubmitting]);

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <div className="confirmPage">
      {loading && <Spinner />}
      <h1>Confirm Page</h1>
      <div className="confirmPage__container">
        <div className="confirmPage__content">
          <h2>Confirm Email</h2>
          <form onSubmit={handleConfirm} className="confirmPage__form">
            <div className="confirmPage__formGroup">
              <input
                className={`confirmPage__formGroupInput ${errors.username &&
                  "form-control is-invalid"} `}
                type="email"
                id="username"
                name="username"
                placeholder="Your Email"
                value={values.username}
                onChange={onChange}
              />
              {errors.username && (
                <label className="confirmPage__formLabel" htmlFor="username">
                  {errors.username}
                </label>
              )}
            </div>
            <div className="confirmPage__formGroup">
              <input
                className={`confirmPage__formGroupInput ${errors.code &&
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
                <label className="confirmPage__formLabel" htmlFor="code">
                  {errors.code}
                </label>
              )}
            </div>
            <div className="confirmPage__formGroup">
              <input
                type="submit"
                name="submit"
                value="SUBMIT"
                placeholder="SUBMIT"
                className="confirmPage__formSubmit"
              />
              {errorMessage && (
                <label className="confirmPage__formLabel" htmlFor="submit">
                  {errorMessage}
                </label>
              )}
            </div>
          </form>
          {confirmRegister && (
            <p className="confirmPage__registerSuccess">
              Cosnfirmation Succcess
            </p>
          )}
          <div className="confirmPage__containerLinks">
            <Link to="/signin" className="confirmPage__link">
              Go to Signin Page
            </Link>
            <Link to="/resendcode" className="confirmPage__link">
              Go to Resend Code Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
