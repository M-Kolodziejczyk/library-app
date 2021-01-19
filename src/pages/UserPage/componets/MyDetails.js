import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/auth/AuthState";
import "./MyDetails.css";

const MyDetails = () => {
  const defaultState = {
    password: "",
    password2: ""
  };
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, errorMessage } = useAuthContext();

  const onChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const validate = values => {
    let errors = {};

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

  const handleNewPassword = e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log("new password");
      setValues(defaultState);
    }
  }, [errors, isSubmitting]);

  return (
    <div className="myDetails">
      <h2>My Details</h2>
      <div className="myDetails__personalInformation">
        <h5>Personal Information</h5>
        <div className="myDetails__personalInformationGroup">
          <p className="myDetails__personalInformationLabel">Email:</p>
          <p className="myDetails__personalInformationContent">
            {user && user.email}
          </p>
        </div>
        <div className="myDetails__personalInformationGroup">
          <p className="myDetails__personalInformationLabel">First Name:</p>
          <p className="myDetails__personalInformationContent">
            {user && user.given_name}
          </p>
        </div>
        <div className="myDetails__personalInformationGroup">
          <p className="myDetails__personalInformationLabel">Last Name:</p>
          <p className="myDetails__personalInformationContent">
            {user && user.family_name}
          </p>
        </div>
      </div>
      <div className="myDetails__password">
        <h5>Password</h5>
        <div className="myDetails__passwordGroup">
          <p className="myDetails__passwordLabel">Password:</p>
          <p className="myDetails__passwordContent">********* </p>
        </div>
        <button
          className="myDetails__passwordCollapseBtn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#passwordForm"
          aria-expanded="false"
          aria-controls="passwordForm"
        >
          Change Password
        </button>
        <div className="collapse myDetails__passwordCollapse" id="passwordForm">
          <h5>Change Password</h5>
          <form
            onSubmit={handleNewPassword}
            className="myDetails__passwordForm"
          >
            <div className="myDetails__passwordFormGroup">
              <input
                className={`myDetails__passwordFormInput 
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
                <label
                  className="myDetails__passwordFormLabel"
                  htmlFor="password"
                >
                  {errors.password}
                </label>
              )}
            </div>
            <div className="myDetails__passwordFormGroup">
              <input
                className={`myDetails__passwordFormInput ${errors.password2 &&
                  "form-control is-invalid"} `}
                type="password"
                id="password2"
                name="password2"
                placeholder="Confirm Password"
                value={values.password2}
                onChange={onChange}
                autoComplete="username"
              />
              {errors.password2 && (
                <label
                  className="myDetails__passwordFormLabel"
                  htmlFor="password2"
                >
                  {errors.password2}
                </label>
              )}
            </div>
            <div className="myDetails__passwordFormGroup">
              <input
                type="submit"
                className="myDetails__passwordFormSubmit"
                placeholder="SUBMIT"
                name="submit"
              />

              {errorMessage && (
                <label
                  className="myDetails__passwordFormLabel"
                  htmlFor="submit"
                >
                  {errorMessage}
                </label>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
