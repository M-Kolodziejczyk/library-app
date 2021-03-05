import React, { useState, useEffect } from "react";
import { useBookContext } from "../../../context/book/BookState";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Spinner from "../../../components/Spinner/Spinner";
import DateFnsUtils from "@date-io/date-fns";
import "./AddAuthor.css";

const materialTheme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        padding: "17px 20px"
      }
    },
    MuiFormLabel: {
      root: {
        fontFamily: "Mulish, sans-serif",
        paddingLeft: "20px",
        fontSize: "14px",
        fontWeight: "500"
      }
    },
    MuiInputLabel: {
      shrink: {
        transform: "none !important"
      }
    }
  }
});

const AddAuthor = () => {
  const defaultState = {
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    description: ""
  };
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    createAuthor,
    loading,
    createAuthorSuccess,
    clearForm
  } = useBookContext();

  const onChange = e => {
    if (e.target) {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
    } else {
      setValues({
        ...values,
        birthDate: e
      });
    }
  };

  const validate = values => {
    let errors = {};

    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    }

    if (!values.birthDate) {
      errors.birthDate = "Date of birth is required!";
    }

    if (!values.description) {
      errors.description = "Description is required!";
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
      createAuthor(values);
      setValues(defaultState);
    }

    // eslint-disable-next-line
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (createAuthorSuccess) {
      const timer = setTimeout(() => {
        clearForm();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [createAuthorSuccess]);

  useEffect(() => {
    clearForm();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="addAuthor">
      {loading && <Spinner />}
      <h2>Add Author</h2>
      <form className="addAuthor__form" onSubmit={handleSubmit}>
        <div className="addAuthor__formGroup">
          <input
            className={`addAuthor__formGroupInput ${errors.firstName &&
              "form-control is-invalid"}`}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={onChange}
          />
          {errors.firstName && (
            <label className="addAuthor__formLabel" htmlFor="firstName">
              {errors.firstName}
            </label>
          )}
        </div>
        <div className="addAuthor__formGroup">
          <input
            className={`addAuthor__formGroupInput ${errors.lastName &&
              "form-control is-invalid"}`}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={onChange}
          />
          {errors.lastName && (
            <label className="addAuthor__formLabel" htmlFor="lastName">
              {errors.lastName}
            </label>
          )}
        </div>
        <div className="addAuthor__formGroup">
          <ThemeProvider theme={materialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                name="birthDate"
                value={values.birthDate}
                onChange={onChange}
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
          {errors.birthDate && (
            <label className="addAuthor__formLabel" htmlFor="birthDate">
              {errors.birthDate}
            </label>
          )}
        </div>
        <div className="addAuthor__formGroup">
          <textarea
            className={`addAuthor__formGroupInput ${errors.description &&
              "form-control is-invalid"}`}
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={onChange}
          />
          {errors.description && (
            <label className="addAuthor__formLabel" htmlFor="description">
              {errors.description}
            </label>
          )}
        </div>
        <div className="addAuthor__formGroup">
          <input
            className="addAuthor__formSubmit"
            type="submit"
            value="SUBMIT"
            name="submit"
            placeholder="Submit"
          />
          {!loading && createAuthorSuccess && (
            <label className="addAuthor__formLabelSuccess" htmlFor="submit">
              Author created successfuly!
            </label>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;
