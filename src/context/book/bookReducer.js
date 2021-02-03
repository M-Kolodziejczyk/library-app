import {
  CREATE_AUTHOR,
  CREATE_AUTHOR_FAIL,
  LIST_AUTHORS,
  LIST_AUTHORS_FAIL,
  CREATE_BOOK,
  CREATE_BOOK_FAIL,
  CLEAR_FORM
} from "../types";

const bookReducer = (state, action) => {
  switch (action.type) {
    case CREATE_AUTHOR:
      return {
        ...state,
        author: action.payload,
        formSuccess: true
      };
    case CREATE_AUTHOR_FAIL:
      return {
        ...state,
        formFail: true,
        formErrorMessage: action.payload.message
      };
    case LIST_AUTHORS:
      return {
        ...state,
        authors: action.payload
      };
    case LIST_AUTHORS_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };
    case CREATE_BOOK:
      return {
        ...state,
        book: action.payload,
        formSuccess: true
      };
    case CREATE_BOOK_FAIL:
      return {
        ...state,
        formFail: true,
        formErrorMessage: action.payload.message
      };
    case CLEAR_FORM:
      return {
        ...state,
        formFail: false,
        formSuccess: false,
        formErrorMessage: "",
        author: {}
      };

    default:
      return state;
  }
};

export default bookReducer;
