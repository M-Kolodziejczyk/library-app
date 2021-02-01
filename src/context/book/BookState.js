import React, { createContext, useReducer, useContext } from "react";
import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import bookReducer from "./bookReducer";
import {
  CREATE_BOOK,
  CREATE_BOOK_FAIL,
  CREATE_AUTHOR,
  CREATE_AUTHOR_FAIL,
  CLEAR_FORM
} from "../types";

export const BookState = props => {
  const initialState = {
    author: {},
    formErrorMessage: "",
    formFail: false,
    formSuccess: false
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

  const clearForm = () => {
    dispatch({
      type: CLEAR_FORM
    });
  };

  return (
    <BookContext.Provider
      value={{
        author: state.author,
        formErrorMessage: state.formErrorMessage,
        formSuccess: state.formSuccess,
        formFail: state.formFail,
        createAuthor,
        clearForm
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);
