import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
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

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isLogged: true,
        user: action.payload.attributes
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
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        loginFail: false,
        isLogged: true,
        user: action.payload.attributes
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
        loginSuccess: false,
        isLogged: false
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
