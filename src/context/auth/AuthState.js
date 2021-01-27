import React, { createContext, useReducer, useContext } from "react";
import { Auth } from "aws-amplify";
import authReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CONFIRM_REGISTER_SUCCESS,
  CONFIRM_REGISTER_FAIL,
  RESEND_CODE_SUCCESS,
  RESEND_CODE_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
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
    loading: true,
    group: "",
    isLogged: false,
    formSuccess: false,
    registerSuccess: false,
    registerFail: false,
    confirmRegister: false,
    resendCode: false,
    loginSuccess: false,
    loginFail: false,
    forgotPasswordSuccess: false,
    newPasswordSuccess: false,
    changePasswordSuccess: false,
    errorMessage: "",
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch({
        type: USER_LOADED,
        payload: user
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.message
      });
    }
  };

  const registerUser = async ({ given_name, family_name, email, password }) => {
    try {
      const res = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          given_name,
          family_name
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

  const confirmRegisterUser = async ({ username, code }) => {
    try {
      const res = await Auth.confirmSignUp(username, code);
      dispatch({
        type: CONFIRM_REGISTER_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: CONFIRM_REGISTER_FAIL,
        payload: error.message
      });
    }
  };

  const resendConfirmCode = async username => {
    try {
      await Auth.resendSignUp(username);
      dispatch({
        type: RESEND_CODE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: RESEND_CODE_FAIL,
        payload: error.message
      });
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const user = await Auth.signIn(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.message
      });
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = async username => {
    try {
      await Auth.forgotPassword(username);

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.message
      });
    }
  };

  const newPassword = async ({ username, code, newPassword }) => {
    try {
      Auth.forgotPasswordSubmit(username, code, newPassword);
      dispatch({
        type: NEW_PASSWORD_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: NEW_PASSWORD_FAIL,
        payload: error.message
      });
    }
  };

  const changePassword = async ({ oldPassword, newPassword }) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const res = await Auth.changePassword(user, oldPassword, newPassword);
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
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
        loading: state.loading,
        group: state.group,
        isLogged: state.isLogged,
        formSuccess: state.formSuccess,
        registerSuccess: state.registerSuccess,
        registerFail: state.registerFail,
        confirmRegister: state.confirmRegister,
        resendCode: state.resendCode,
        loginSuccess: state.loginSuccess,
        loginFail: state.loginFail,
        forgotPasswordSuccess: state.forgotPasswordSuccess,
        newPasswordSuccess: state.newPasswordSuccess,
        changePasswordSuccess: state.changePasswordSuccess,
        errorMessage: state.errorMessage,
        user: state.user,
        loadUser,
        registerUser,
        confirmRegisterUser,
        resendConfirmCode,
        loginUser,
        logout,
        forgotPassword,
        newPassword,
        changePassword,
        clearErros
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);
