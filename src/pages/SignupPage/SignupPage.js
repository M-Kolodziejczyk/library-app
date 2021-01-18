import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";

import "./SignupPage.css";

const SignupPage = () => {
  const defaultState = {
    given_name: "",
    family_name: "",
    email: "",
    password: "",
    password2: ""
  };

  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(defaultState);
  const {
    registerUser,
    registerFail,
    errorMessage,
    registerSuccess,
    user
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
    if (!values.given_name) {
      errors.given_name = "Name is required!";
    }
    if (!values.family_name) {
      errors.family_name = "Last name is required!";
    }

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

    if (!values.password2) {
      errors.password2 = "Confirm password!";
    } else if (values.password !== values.password2) {
      errors.password2 = "Passwords do not match!";
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
      registerUser(values);
      setValues(defaultState);
    }

    // eslint-disable-next-line
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (registerSuccess && user) {
      history.push(`/confirm/${user.username}`);
    }
  }, [registerSuccess]);

  return (
    <div className="signupPage">
      <h1>Signup Page</h1>
      <div className="signupPage__container">
        <div className="singupPage__content">
          <h2>Create Account</h2>
          <form className="singupPage__form" onSubmit={handleSubmit}>
            <div className="signupPage__formGroup">
              <input
                className={`signupPage__formGroupInput 
                ${errors.given_name && "form-control is-invalid"}`}
                type="text"
                id="given_name"
                name="given_name"
                value={values.given_name}
                onChange={onChange}
                placeholder="First Name"
              />
              {errors.given_name && (
                <label className="singupPage__formLabel" htmlFor="given_name">
                  {errors.given_name}
                </label>
              )}
            </div>
            <div className="signupPage__formGroup">
              <input
                className={`signupPage__formGroupInput 
                ${errors.family_name && "form-control is-invalid"}`}
                type="text"
                id="family_name"
                name="family_name"
                value={values.family_name}
                onChange={onChange}
                placeholder="Last Name"
              />
              {errors.family_name && (
                <label className="singupPage__formLabel" htmlFor="family_name">
                  {errors.family_name}
                </label>
              )}
            </div>
            <div className="signupPage__formGroup">
              <input
                className={`signupPage__formGroupInput 
                ${errors.email && "form-control is-invalid"}`}
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={onChange}
                placeholder="Your Email"
                autoComplete="username"
              />
              {errors.email && (
                <label className="singupPage__formLabel" htmlFor="email">
                  {errors.email}
                </label>
              )}
            </div>
            <div className="signupPage__formGroup">
              <input
                className={`signupPage__formGroupInput 
                ${errors.password && "form-control is-invalid"}`}
                type="password"
                id="password"
                name="password"
                values={values.password}
                onChange={onChange}
                placeholder="Password"
                autoComplete="new-password"
              />
              {errors.password && (
                <label className="singupPage__formLabel" htmlFor="password">
                  {errors.password}
                </label>
              )}
            </div>
            <div className="signupPage__formGroup">
              <input
                className={`signupPage__formGroupInput 
                ${errors.password2 && "form-control is-invalid"}`}
                type="password"
                id="password2"
                name="password2"
                values={values.password2}
                onChange={onChange}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
              {errors.password2 && (
                <label className="singupPage__formLabel" htmlFor="password2">
                  {errors.password2}
                </label>
              )}
            </div>
            <div className="signupPage__formGroup">
              <input
                type="submit"
                className="signupPage__formSubmit"
                placeholder="SUBMIT"
                name="submit"
              />
              {registerFail && (
                <label className="singupPage__formLabel" htmlFor="submit">
                  {errorMessage}
                </label>
              )}
            </div>
          </form>
          <p className="signupPage__login">
            Have already an account?{" "}
            <Link to="/signin" className="signupPage__link">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
