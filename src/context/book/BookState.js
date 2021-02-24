import React, { createContext, useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { API, Storage } from "aws-amplify";
import * as mutations from "../../api/mutations";
import * as queries from "../../api/queries";
import bookReducer from "./bookReducer";
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
  CLEAR_FORM
} from "../types";

export const BookState = props => {
  const initialState = {
    author: {},
    authors: [],
    book: {},
    books: [],
    basket: [],
    formErrorMessage: "",
    formFail: false,
    formSuccess: false,
    errorMessage: "",
    order: "",
    orderSuccess: false,
    orders: [],
    getOrdersSuccess: false
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  const createAuthor = async author => {
    clearForm();

    try {
      const res = await API.graphql({
        query: mutations.createAuthor,
        variables: { input: author }
      });
      dispatch({
        tpye: CREATE_AUTHOR,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: CREATE_AUTHOR_FAIL,
        payload: error.message
      });
    }
  };

  const getAuthor = async id => {
    try {
      const res = await API.graphql({
        variables: { id: id },
        authMode: "API_KEY",
        query: queries.getAuthor
      });

      dispatch({
        type: GET_AUTHOR,
        payload: res.data.getAuthor
      });
    } catch (error) {
      dispatch({
        type: GET_AUTHOR_FAIL,
        payload: error
      });
    }
  };

  const listAuthors = async () => {
    try {
      const res = await API.graphql({
        query: queries.listAuthors,
        authMode: "API_KEY"
      });
      dispatch({
        type: LIST_AUTHORS,
        payload: res.data.listAuthors.items
      });
    } catch (error) {
      dispatch({
        type: LIST_AUTHORS_FAIL,
        payload: error.message
      });
    }
  };

  const createBook = async (book, image) => {
    clearForm();

    try {
      await Storage.put(image.name, image, {
        contentType: image.type
      });
      const res = await API.graphql({
        query: mutations.createBook,
        variables: { input: book }
      });

      dispatch({
        tpye: CREATE_BOOK,
        payload: res.data.createBook
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOOK_FAIL,
        payload: error.errors[0].message
      });
    }
  };

  const listBooks = async categoryInput => {
    try {
      const res = await API.graphql({
        query: queries.booksByCategory,
        authMode: "API_KEY",
        variables: {
          category: categoryInput
        }
      });
      dispatch({
        type: LIST_BOOKS,
        payload: {
          books: res.data.booksByCategory.items,
          category: categoryInput
        }
      });
    } catch (error) {
      dispatch({
        type: LIST_BOOKS_FAIL,
        payload: error
      });
    }
  };

  const getBook = async id => {
    try {
      let res = await API.graphql({
        query: queries.getBook,
        variables: { id: id },
        authMode: "API_KEY"
      });

      const key = res.data.getBook.image.name;
      const signedURL = await Storage.get(key);

      res.data.getBook.link = signedURL;

      dispatch({
        type: GET_BOOK,
        payload: res.data.getBook
      });
    } catch (error) {
      dispatch({
        type: GET_BOOK_FAIL,
        payload: error
      });
    }
  };

  const addToBasket = async book => {
    try {
      dispatch({
        type: ADD_TO_BASKET,
        payload: book
      });
    } catch (error) {
      dispatch({
        type: ADD_TO_BASKET_FAIL,
        payload: error
      });
    }
  };

  const deleteFromBasket = basket => {
    dispatch({
      type: DELETE_FROM_BASKET,
      payload: basket
    });
  };

  const deleteBasket = () => {
    dispatch({
      type: DELETE_BASKET
    });
  };

  const createOrder = async orderDetails => {
    clearForm();
    orderDetails.id = uuidv4();

    try {
      const res = await API.graphql({
        query: mutations.processOrder,
        variables: {
          input: orderDetails
        }
      });
      dispatch({
        type: CREATE_ORDER,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error
      });
    }
  };

  const getUserOrders = async email => {
    clearForm();

    try {
      const res = await API.graphql({
        variables: {
          customer: email,
          createdAt: { beginsWith: "2021" }
        },
        query: queries.ordersByCustomerByDate
      });

      dispatch({
        type: GET_USER_ORDERS,
        payload: res.data.ordersByCustomerByDate.items
      });
    } catch (error) {
      dispatch({
        type: GET_USER_ORDERS_FAIL,
        payload: error
      });
    }
  };

  const clearForm = () => {
    dispatch({
      type: CLEAR_FORM
    });
  };

  return (
    <BookContext.Provider
      value={{
        author: state.author,
        authors: state.authors,
        book: state.book,
        books: state.books,
        basket: state.basket,
        formErrorMessage: state.formErrorMessage,
        formSuccess: state.formSuccess,
        formFail: state.formFail,
        errorMessage: state.errorMessage,
        order: state.order,
        orderSuccess: state.orderSuccess,
        orders: state.orders,
        getOrdersSuccess: state.getOrdersSuccess,
        createAuthor,
        getAuthor,
        listAuthors,
        createBook,
        listBooks,
        getBook,
        addToBasket,
        deleteFromBasket,
        deleteBasket,
        createOrder,
        getUserOrders,
        clearForm
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);
