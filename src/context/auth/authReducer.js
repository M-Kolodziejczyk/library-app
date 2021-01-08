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

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isLogged: true
      };
    default:
      return state;
  }
};
