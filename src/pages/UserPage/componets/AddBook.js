import React, { useState, useEffect } from "react";
import { useBookContext } from "../../../context/book/BookState";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import awsExports from "../../../aws-exports";
import Spinner from "../../../components/Spinner/Spinner";
import "./AddBook.css";

const AddBook = () => {
  const defaultState = {
    title: "",
    authorID: "",
    publisher: "",
    publishedDate: new Date(),
    language: "",
    description: "",
    category: "",
    totalPages: "",
    isbn: "",
    totalCopies: "",
    status: "",
    image: {}
  };

  const categories = [
    "Action and Adventure",
    "Classics",
    "Comic Book or Graphic Novel",
    "Detective and Mystery",
    "Fantasy",
    "Horror",
    "Literary Fiction",
    "Romance",
    "Science Fiction",
    "Thrillers",
    "Biographies and Autobiographies",
    "History",
    "Poetry",
    "Travel"
  ];
  const statuses = ["available", "not available"];

  const languages = ["English", "Polish"];
  const [values, setValues] = useState(defaultState);
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    authors,
    listAuthors,
    createBook,
    clearForm,
    loading,
    createBookSuccess
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
        publishedDate: e
      });
    }
  };

  const onChangeAuthor = e => {
    const { name, value, options } = e.target;
    setValues({
      ...values,
      [name]: value,
      authorName: options[options.selectedIndex].text
    });
  };

  const onChangeImage = e => {
    const file = e.target.files[0];
    if (file) {
      setValues({
        ...values,
        image: {
          name: file.name,
          bucket: awsExports.aws_user_files_s3_bucket,
          region: awsExports.aws_user_files_s3_bucket_region,
          key: "public/" + file.name
        }
      });
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setValues({
        ...values,
        image: {}
      });
      setImage({});
      setImageUrl();
    }
  };

  const validate = values => {
    let errors = {};

    if (Object.keys(values.image).length === 0) {
      errors.image = "Image is required!";
    } else if (image.type !== "image/jpeg" && image.type !== "image/png") {
      errors.image = "Image format only jpeg or png!";
    }
    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.authorID) {
      errors.authorID = "Author is required!";
    }
    if (!values.publisher) {
      errors.publisher = "Publisher is required!";
    }
    if (!values.publishedDate) {
      errors.publishedDate = "Publish Date is required!";
    }
    if (!values.language) {
      errors.language = "Language is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.category) {
      errors.category = "Category is required!";
    }
    if (!values.totalPages) {
      errors.totalPages = "Total Pages is required!";
    } else if (!/^[0-9]*$/.test(values.totalPages)) {
      errors.totalPages = "Only numbers!";
    }
    if (!values.isbn) {
      errors.isbn = "ISBN is required!";
    }
    if (!values.totalCopies) {
      errors.totalCopies = "Total copies is required!";
    } else if (!/^[0-9]*$/.test(values.totalCopies)) {
      errors.totalCopies = "Only numbers!";
    }
    if (!values.status) {
      errors.status = "Status is required!";
    }

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (authors.length === 0) {
      listAuthors();
    }

    // eslint-disable-next-line
  }, [authors]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      createBook(values, image);
      setValues(defaultState);
    }

    // eslint-disable-next-line
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (createBookSuccess) {
      const timer = setTimeout(() => {
        clearForm();
      }, 4000);
      return () => clearTimeout(timer);
    }

    // eslint-disable-next-line
  }, [createBookSuccess]);

  useEffect(() => {
    clearForm();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="addBook">
      {loading && <Spinner />}
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="addBook__form">
        <div className="addBook__formGroup">
          <input
            className="addBook__formGroupInputImage"
            type="file"
            name="image"
            id="image"
            placeholder="Select book image"
            onChange={onChangeImage}
          />
          <img src={imageUrl} alt="" className="addBook__formGroupImage" />
          {errors.image && (
            <label className="addBook__formLabel" htmlFor="image">
              {errors.image}
            </label>
          )}
        </div>
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
          <select
            className={`addBook__formGroupSelect ${errors.authorID &&
              "form-control is-invalid"}`}
            type="text"
            id="authorID"
            name="authorID"
            placeholder="Author"
            value={values.authorID}
            onChange={onChangeAuthor}
          >
            <option key="1" value="" disabled>
              Author
            </option>
            {authors.map(e => (
              <option key={e.id} value={e.id}>
                {e.firstName} {e.lastName}
              </option>
            ))}
          </select>
          {errors.authorID && (
            <label className="addBook__formLabel" htmlFor="authorID">
              {errors.authorID}
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
              label="Published Date"
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
          <select
            className={`addBook__formGroupSelect ${errors.language &&
              "form-control is-invalid"}`}
            type="text"
            id="language"
            name="language"
            placeholder="Language"
            value={values.language}
            onChange={onChange}
          >
            <option key="1" value="" disabled>
              Language
            </option>
            {languages.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          {errors.language && (
            <label className="addBook__formLabel" htmlFor="language">
              {errors.language}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <textarea
            className={`addBook__formGroupInput ${errors.description &&
              "form-control is-invalid"}`}
            type="text"
            id="bookDescription"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={onChange}
          />
          {errors.description && (
            <label className="addBook__formLabel" htmlFor="bookDescription">
              {errors.description}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <select
            className={`addBook__formGroupSelect ${errors.category &&
              "form-control is-invalid"}`}
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={values.category}
            onChange={onChange}
          >
            <option key="1" value="" disabled>
              Category
            </option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <label className="addBook__formLabel" htmlFor="category">
              {errors.category}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <input
            className={`addBook__formGroupInput ${errors.totalPages &&
              "form-control is-invalid"}`}
            type="text"
            id="totalPages"
            name="totalPages"
            placeholder="Total Pages"
            value={values.totalPages}
            onChange={onChange}
          />
          {errors.totalPages && (
            <label className="addBook__formLabel" htmlFor="totalPages">
              {errors.totalPages}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <input
            className={`addBook__formGroupInput ${errors.isbn &&
              "form-control is-invalid"}`}
            type="text"
            id="isbn"
            name="isbn"
            placeholder="ISBN Number"
            value={values.isbn}
            onChange={onChange}
          />
          {errors.isbn && (
            <label className="addBook__formLabel" htmlFor="isbn">
              {errors.isbn}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <input
            className={`addBook__formGroupInput ${errors.totalCopies &&
              "form-control is-invalid"}`}
            type="text"
            id="totalCopies"
            name="totalCopies"
            placeholder="Total Copies"
            value={values.totalCopies}
            onChange={onChange}
          />
          {errors.totalCopies && (
            <label className="addBook__formLabel" htmlFor="totalCopies">
              {errors.totalCopies}
            </label>
          )}
        </div>
        <div className="addBook__formGroup">
          <select
            className={`addBook__formGroupSelect ${errors.status &&
              "form-control is-invalid"}`}
            type="text"
            id="status"
            name="status"
            placeholder="Category"
            value={values.status}
            onChange={onChange}
          >
            <option key="1" value="" disabled>
              Status
            </option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <label className="addBook__formLabel" htmlFor="status">
              {errors.status}
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
          {!loading && createBookSuccess && (
            <label className="addBook__formLabelSuccess" htmlFor="submit">
              Book created successfuly!
            </label>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBook;
