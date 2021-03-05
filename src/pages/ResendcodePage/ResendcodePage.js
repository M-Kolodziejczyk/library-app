import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";
import Spinner from "../../components/Spinner/Spinner";

import "./ResendcodePage.css";

const ResendcodePage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    resendCode,
    errorMessage,
    resendConfirmCode,
    clearErrors,
    loading
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
      resendConfirmCode(email);
    }
  }, [errors, isSubmitting]);

  useEffect(() => {
    clearErrors();
  }, []);

  useEffect(() => {
    if (resendCode) {
      history.push(`/confirm/${email}`);
    }
  }, [resendCode]);

  return (
    <div className="resendcodePage">
      {loading && <Spinner />}
      <h1>Resend Code</h1>
      <div className="resendcodePage__container">
        <div className="resendcodePage__content">
          <h2>Resend confirm code</h2>
          <form onSubmit={handleSubmit} className="resendcodePage__form">
            <div className="resendcodePage__formGroup">
              <input
                className={`resendcodePage__formGroupInput ${errors &&
                  "form-control is-invalid"} `}
                type="email"
                id="username"
                name="username"
                placeholder="Your Email"
                value={email}
                onChange={onChange}
              />
              {errors && (
                <label className="resendcodePage__formLabel" htmlFor="username">
                  {errors}
                </label>
              )}
            </div>
            <div className="resendcodePage__submitGroup">
              <Link
                to={`/confirm/${email}`}
                className="resendcodePage__submitGroupLink"
              >
                Go to Confirm Page
              </Link>
              <input
                type="submit"
                value="SUBMIT"
                name="submit"
                placeholder="SUBMIT"
                className="resendcodePage__submitGroupSubmit"
              />
            </div>
            {errorMessage && (
              <p className="resendcodePage__errorMessage" htmlFor="submit">
                {errorMessage}
              </p>
            )}
            {resendCode && (
              <p className="resendcodePage__successMessage" htmlFor="submit">
                Confirmation code was sent to: {email}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResendcodePage;
