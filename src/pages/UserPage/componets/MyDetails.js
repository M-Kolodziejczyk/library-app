import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/auth/AuthState";
import Spinner from "../../../components/Spinner/Spinner";
import "./MyDetails.css";

const MyDetails = () => {
  const defaultState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    user,
    errorMessage,
    changePassword,
    changePasswordSuccess,
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

    if (!values.oldPassword) {
      errors.oldPassword = "Old password is required!";
    } else if (values.oldPassword.length < 6) {
      errors.oldPassword = "Old password needs to be more than 6 characters!";
    }

    if (!values.newPassword) {
      errors.newPassword = "Password is required!";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password needs to be more than 6 characters!";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required!";
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match!";
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
      changePassword(values);
      setValues(defaultState);
    }

    // eslint-disable-next-line
  }, [errors, isSubmitting]);

  useEffect(() => {
    clearErrors();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="myDetails">
      {loading && <Spinner />}
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
        <div className="myDetails__passwordGroup">
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
        </div>
        <div className="collapse myDetails__passwordCollapse" id="passwordForm">
          <h5>Change Password</h5>
          <form
            onSubmit={handleNewPassword}
            className="myDetails__passwordForm"
          >
            <div className="myDetails__passwordFormGroup">
              <input
                className={`myDetails__passwordFormInput 
                ${errors.oldPassword && "form-control is-invalid"}`}
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="Old Password"
                value={values.oldPassword}
                onChange={onChange}
                autoComplete="current-password"
              />
              {errors.oldPassword && (
                <label
                  className="myDetails__passwordFormLabel"
                  htmlFor="oldPassword"
                >
                  {errors.oldPassword}
                </label>
              )}
            </div>
            <div className="myDetails__passwordFormGroup">
              <input
                className={`myDetails__passwordFormInput 
                ${errors.newPassword && "form-control is-invalid"}`}
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Password"
                value={values.newPassword}
                onChange={onChange}
                autoComplete="current-password"
              />
              {errors.newPassword && (
                <label
                  className="myDetails__passwordFormLabel"
                  htmlFor="newPassword"
                >
                  {errors.newPassword}
                </label>
              )}
            </div>
            <div className="myDetails__passwordFormGroup">
              <input
                className={`myDetails__passwordFormInput ${errors.confirmPassword &&
                  "form-control is-invalid"} `}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={onChange}
                autoComplete="username"
              />
              {errors.confirmPassword && (
                <label
                  className="myDetails__passwordFormLabel"
                  htmlFor="confirmPassword"
                >
                  {errors.confirmPassword}
                </label>
              )}
            </div>
            <div className="myDetails__passwordFormGroup">
              <input
                type="submit"
                value="SUBMIT"
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
              {changePasswordSuccess && (
                <p className="myDetails__passwordFormSuccess">
                  Password changed successfully!
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
