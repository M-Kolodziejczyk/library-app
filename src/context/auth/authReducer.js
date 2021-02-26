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
  CLEAR_ERRORS,
  SET_LOADING
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
        user: action.payload,
        loading: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerFail: true,
        errorMessage: action.payload,
        loading: false
      };
    case CONFIRM_REGISTER_SUCCESS:
      return {
        ...state,
        confirmRegister: true,
        loading: false
      };
    case CONFIRM_REGISTER_FAIL:
      return {
        ...state,
        confirmRegister: false,
        errorMessage: action.payload,
        loading: false
      };
    case RESEND_CODE_SUCCESS:
      return {
        ...state,
        resendCode: true,
        loading: false
      };
    case RESEND_CODE_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
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
        loading: false,
        errorMessage: action.payload,
        loginFail: true,
        loginSuccess: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutSuccess: true,
        user: {},
        group: [],
        loginSuccess: false,
        isLogged: false
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: true,
        loading: false
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      };
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        newPasswordSuccess: true,
        loading: false
      };
    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        newPasswordSuccess: false,
        errorMessage: action.payload,
        loading: false
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordSuccess: true,
        errorMessage: true,
        loading: false
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changePasswordSuccess: false,
        errorMessage: action.payload,
        loading: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        changePasswordSuccess: false,
        newPasswordSuccess: false,
        forgotPasswordSuccess: false,
        logoutSuccess: false,
        registerSuccess: false,
        registerFail: false,
        confirmRegister: false,
        resendCode: false,
        errorMessage: ""
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
