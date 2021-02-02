import {
  CREATE_BOOK,
  CREATE_AUTHOR_FAIL,
  LIST_AUTHORS,
  LIST_AUTHORS_FAIL,
  CLEAR_FORM
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CREATE_BOOK:
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
