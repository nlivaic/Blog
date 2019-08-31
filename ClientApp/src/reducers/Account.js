import { combineReducers } from "redux";
import * as api from "../api/account";

const requestRegistrationType = "REQUEST_REGISTRATION";
const receiveRegistrationType = "RECEIVE_REGISTRATION";
const requestLoginType = "REQUEST_LOGIN";
const receiveLoginType = "RECEIVE_LOGIN";
const requestLogoutType = "REQUEST_LOGOUT";
const receiveLogoutType = "RECEIVE_LOGOUT";

const initialRegistrationState = { isRegistered: false, message: "" };
const initialLoginState = { isLoggedIn: false, message: "" };

export const actionCreators = {
  register: registerCredentials => dispatch => {
    dispatch({ type: requestRegistrationType });
    api.register(registerCredentials).then(response => {
      dispatch({ type: receiveRegistrationType, response });
    });
  },
  login: loginCredentials => dispatch => {
    dispatch({ type: requestLoginType });
    api
      .login(loginCredentials)
      .then(response => dispatch({ type: receiveLoginType, response }));
  },
  logout: () => dispatch => {
    dispatch({ type: requestLogoutType });
    api
      .logout()
      .then(response => dispatch({ type: receiveLogoutType, response }));
  }
};

const registration = (state = initialRegistrationState, action) => {
  switch (action.type) {
    case receiveRegistrationType:
      return action.response;
    default:
      return state;
  }
};

const isRegistering = (state = false, action) => {
  switch (action.type) {
    case requestRegistrationType:
      return true;
    case receiveRegistrationType:
      return false;
    default:
      return state;
  }
};

const login = (state = initialLoginState, action) => {
  switch (action.type) {
    case receiveLoginType:
    case receiveLogoutType:
      return action.response;
    default:
      return state;
  }
};

const isLoggingIn = (state = false, action) => {
  switch (action.type) {
    case requestLoginType:
      return true;
    case receiveLoginType:
      return false;
    default:
      return state;
  }
};

const isLoggingOut = (state = false, action) => {
  switch (action.type) {
    case requestLogoutType:
      return true;
    case receiveLogoutType:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  registration,
  isRegistering,
  login,
  isLoggingIn,
  isLoggingOut
});

// Selectors
export const getRegistration = state => state.registration;

export const getIsRegistering = state => state.isRegistering;

export const getLogin = state => state.login;

export const getIsLoggingIn = state => state.isLoggingIn;

export const getIsLoggingOut = state => state.isLoggingOut;
