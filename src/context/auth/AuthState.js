import React, { createContext, useReducer, useContext } from "react";
import { Auth } from "aws-amplify";
import authReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CLEAR_ERRORS,
  CHANGE_NAME_SUCCESS,
  CHANGE_NAME_FAIL,
  CLEAR_MESSAGE,
  SET_LOADING
} from "../types";

export const AuthState = props => {
  const initialState = {
    isLogged: null,
    formSuccess: false,
    registerSuccess: false,
    registerFail: false,
    errorMessage: "",
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    try {
      const res = "loaded";
      dispatch({
        type: USER_LOADED,
        payload: res
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      const res = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: name
        }
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.user
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.message
      });
    }
  };

  const clearErros = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged: state.isLogged,
        formSuccess: state.formSuccess,
        registerSuccess: state.registerSuccess,
        registerFail: state.registerFail,
        user: state.user,
        errorMessage: state.errorMessage,
        loadUser,
        registerUser,
        clearErros
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);
