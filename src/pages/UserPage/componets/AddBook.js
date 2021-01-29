import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/auth/AuthState";
import {
  KeyboardDatePicker,
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./AddBook.css";

const AddBook = () => {
  const defaultState = {
    title: "",
    authorId: "",
    publisher: "",
    publishedDate: new Date(),
    description: "",
    category: "",
    totalPages: "",
    isbn: "",
    tags: [""],
    totalCopies: "",
    status: ""
  };
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = e => {
    console.log(e);
    if (e.target) {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
    } else {
      setValues({
        ...values,
        publishedDate: e
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
    console.log("add Book");
  };

  return (
    <div className="addBook">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="addBook__form">
        <div className="addBook__formGroup">
          <input
            className={`addBook__formGroupInput ${errors.title &&
              "form-control is-invalid"}`}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={values.title}
            onChange={onChange}
          />
          {errors.title && (
            <label className="addBook__formLabel" htmlFor="title">
              {errors.title}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <input
            className={`addBook__formGroupInput ${errors.publisher &&
              "form-control is-invalid"}`}
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
            value={values.publisher}
            onChange={onChange}
          />
          {errors.publisher && (
            <label className="addBook__formLabel" htmlFor="publisher">
              {errors.publisher}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              openTo="year"
              views={["year", "month"]}
              label="Year and Month"
              name="publishedDate"
              value={values.publishedDate}
              onChange={onChange}
              format="yyyy/MM"
            />
          </MuiPickersUtilsProvider>
          {errors.publishedDate && (
            <label className="addBook__formLabel" htmlFor="publishedDate">
              {errors.publishedDate}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <textarea
            className={`addBook__formGroupInput ${errors.description &&
              "form-control is-invalid"}`}
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={onChange}
          />
          {errors.description && (
            <label className="addBook__formLabel" htmlFor="description">
              {errors.description}
            </label>
          )}
        </div>

        <div className="addBook__fromGroup">
          <input
            className="addBook__formSubmit"
            type="submit"
            name="submit"
            placeholder="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBook;
