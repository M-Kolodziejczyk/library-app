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
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CLEAR_ERRORS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isLogged: true,
        loading: false,
        user: action.payload.attributes,
        group:
          action.payload.signInUserSession.idToken.payload["cognito:groups"]
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        user: action.payload
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerFail: true,
        errorMessage: action.payload
      };
    case CONFIRM_REGISTER_SUCCESS:
      return {
        ...state,
        confirmRegister: true
      };
    case CONFIRM_REGISTER_FAIL:
      return {
        ...state,
        confirmRegister: false,
        errorMessage: action.payload
      };
    case RESEND_CODE_SUCCESS:
      return {
        ...state,
        resendCode: true
      };
    case RESEND_CODE_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        loginFail: false,
        isLogged: true,
        user: action.payload.attributes,
        group:
          action.payload.signInUserSession.idToken.payload["cognito:groups"]
      };
    case LOGIN_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        loginFail: true,
        loginSuccess: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        group: [],
        loginSuccess: false,
        isLogged: false
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: true
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        errorMessage: action.payload
      };
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        newPasswordSuccess: true
      };
    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        newPasswordSuccess: false,
        errorMessage: action.payload
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordSuccess: true,
        errorMessage: true
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changePasswordSuccess: false,
        errorMessage: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        registerSuccess: false,
        registerFail: false,
        errorMessage: ""
      };
    default:
      return state;
  }
};
