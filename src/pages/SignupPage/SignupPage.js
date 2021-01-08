import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./SignupPage.css";

const SignupPage = () => {
  const defaultState = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(defaultState);

  const onChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const validate = values => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
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
      console.log("working");
      setValues(defaultState);
    }
  }, [errors, isSubmitting]);

  return (
    <div className="SignupPage">
      <h1>Signup Page</h1>
      <div className="signupPage__container">
        <div className="singupPage__content">
          <h2>Create Account</h2>
          <form className="singupPage__form" onSubmit={handleSubmit}>
            <div className="signupPage__formGroup">
              <input
                className={`signupPage__formGroupInput 
                ${errors.name && "form-control is-invalid"}`}
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={onChange}
                placeholder="Your Name"
              />
              {errors.name && (
                <label className="singupPage__formLabel" htmlFor="name">
                  {errors.name}
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
              />
              {errors.email && (
                <label className="singupPage__formLabel" htmlFor="name">
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
              />
              {errors.password && (
                <label className="singupPage__formLabel" htmlFor="name">
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
              />
              {errors.password2 && (
                <label className="singupPage__formLabel" htmlFor="name">
                  {errors.password2}
                </label>
              )}
            </div>
            <div className="signupPage__formGroup">
              <input
                type="submit"
                className="signupPage__formSubmit"
                placeholder="SUBMIT"
              />
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
