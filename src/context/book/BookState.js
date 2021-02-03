import React, { createContext, useReducer, useContext } from "react";
import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import bookReducer from "./bookReducer";
import {
  CREATE_AUTHOR,
  CREATE_AUTHOR_FAIL,
  LIST_AUTHORS,
  LIST_AUTHORS_FAIL,
  CREATE_BOOK,
  CREATE_BOOK_FAIL,
  CLEAR_FORM
} from "../types";

export const BookState = props => {
  const initialState = {
    author: {},
    authors: [],
    book: {},
    books: [],
    formErrorMessage: "",
    formFail: false,
    formSuccess: false,
    errorMessage: ""
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

  const listAuthors = async () => {
    try {
      const res = await API.graphql({
        query: queries.listAuthors
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

  const createBook = async book => {
    clearForm();

    try {
      const res = await API.graphql({
        query: mutations.createBook,
        variables: { input: book }
      });

      dispatch({
        tpye: CREATE_BOOK,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOOK_FAIL,
        payload: error.message
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
        formErrorMessage: state.formErrorMessage,
        formSuccess: state.formSuccess,
        formFail: state.formFail,
        errorMessage: state.errorMessage,
        createAuthor,
        listAuthors,
        createBook,
        clearForm
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);
