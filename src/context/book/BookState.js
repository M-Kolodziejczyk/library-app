import React, { createContext, useReducer, useContext } from "react";
import { API, Storage } from "aws-amplify";
import * as mutations from "../../api/mutations";
import * as queries from "../../api/queries";
import bookReducer from "./bookReducer";
import {
  CREATE_AUTHOR,
  CREATE_AUTHOR_FAIL,
  LIST_AUTHORS,
  LIST_AUTHORS_FAIL,
  CREATE_BOOK,
  CREATE_BOOK_FAIL,
  LIST_BOOKS,
  LIST_BOOKS_FAIL,
  CLEAR_FORM,
  GET_BOOK,
  GET_BOOK_FAIL
} from "../types";
import { publicDecrypt } from "crypto";

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

  const listBooks = async () => {
    try {
      const res = await API.graphql({
        query: queries.listBooks,
        authMode: "API_KEY"
      });
      dispatch({
        type: LIST_BOOKS,
        payload: res.data.listBooks.items
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
        listBooks,
        getBook,
        clearForm
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);
