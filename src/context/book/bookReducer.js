import {
  CREATE_AUTHOR,
  CREATE_AUTHOR_FAIL,
  GET_AUTHOR,
  GET_AUTHOR_FAIL,
  LIST_AUTHORS,
  LIST_AUTHORS_FAIL,
  CREATE_BOOK,
  CREATE_BOOK_FAIL,
  LIST_BOOKS,
  LIST_BOOKS_FAIL,
  GET_BOOK,
  GET_BOOK_FAIL,
  ADD_TO_BASKET,
  ADD_TO_BASKET_FAIL,
  DELETE_FROM_BASKET,
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
    case GET_AUTHOR:
      return {
        ...state,
        author: action.payload
      };
    case GET_AUTHOR_FAIL:
      return {
        ...state,
        errorMessage: action.payload
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
    case LIST_BOOKS:
      return {
        ...state,
        books: {
          ...state.books,
          [action.payload.category]: action.payload.books
        }
      };
    case LIST_BOOKS_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };
    case GET_BOOK:
      return {
        ...state,
        book: action.payload
      };
    case GET_BOOK_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload]
      };
    case ADD_TO_BASKET_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };
    case DELETE_FROM_BASKET:
      return {
        ...state,
        basket: action.payload
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
