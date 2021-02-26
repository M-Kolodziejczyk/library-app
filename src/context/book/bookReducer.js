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
  DELETE_BASKET,
  CREATE_ORDER,
  CREATE_ORDER_FAIL,
  GET_USER_ORDERS,
  GET_USER_ORDERS_FAIL,
  CLEAR_FORM,
  SET_LOADING
} from "../types";

const bookReducer = (state, action) => {
  switch (action.type) {
    case CREATE_AUTHOR:
      return {
        ...state,
        createAuthorSuccess: true,
        author: action.payload,
        formSuccess: true,
        loading: false
      };
    case CREATE_AUTHOR_FAIL:
      return {
        ...state,
        createAuthorSuccess: false,
        formFail: true,
        formErrorMessage: action.payload.message,
        loading: false
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
        formSuccess: true,
        createBookSuccess: true,
        loading: false
      };
    case CREATE_BOOK_FAIL:
      return {
        ...state,
        formFail: true,
        formErrorMessage: action.payload.message,
        createBookSuccess: false,
        loading: false
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
    case DELETE_BASKET:
      return {
        ...state,
        basket: []
      };
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
        orderSuccess: true
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        orderSuccess: false
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        orders: action.payload,
        getOrdersSuccess: true
      };
    case GET_USER_ORDERS_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        getOrdersSuccess: false
      };
    case CLEAR_FORM:
      return {
        ...state,
        createAuthorSuccess: false,
        createBookSuccess: false,
        formFail: false,
        formSuccess: false,
        orderSuccess: false,
        getOrdersSuccess: false,
        formErrorMessage: "",
        errorMessage: "",
        author: {}
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default bookReducer;
