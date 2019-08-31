import { combineReducers } from "redux";
import * as api from "../api/author";

const requestAuthorType = "REQUEST_AUTHOR";
const receiveAuthorType = "RECEIVE_AUTHOR";
const notFoundAuthorType = "NOT_FOUND_AUTHOR";
const errorType = "ERROR_AUTHOR";
const initialState = {
  blogPostSummaries: [],
  name: ""
};
const initialErrorState = { isError: false, message: "" };

export const actionCreators = {
  requestAuthor: id => dispatch => {
    dispatch({ type: requestAuthorType });
    api
      .getAuthor(id)
      .then(response => dispatch({ response, type: receiveAuthorType }))
      .catch(error => {
        switch (error.status) {
          case 404:
            dispatch({ type: notFoundAuthorType });
            break;
          default:
            dispatch({
              response: `An error occurred trying to fetch author ${id}: ${
                error.message
              }`,
              type: errorType
            });
            break;
        }
      });
  }
};

const author = (state = initialState, action) => {
  switch (action.type) {
    case receiveAuthorType:
      return action.response;
    default:
      return state;
  }
};

const isNotFound = (state = false, action) => {
  switch (action.type) {
    case errorType:
    case receiveAuthorType:
    case requestAuthorType:
      return false;
    case notFoundAuthorType:
      return true;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case errorType:
    case notFoundAuthorType:
    case receiveAuthorType:
      return false;
    case requestAuthorType:
      return true;
    default:
      return state;
  }
};

const error = (state = initialErrorState, action) => {
  switch (action.type) {
    case errorType:
      return {
        isError: true,
        message: action.response
      };
    case receiveAuthorType:
      return initialErrorState;
    default:
      return state;
  }
};

export default combineReducers({ author, error, isLoading, isNotFound });

// Selectors
export const getAuthor = state => state.author;
export const getIsLoading = state => state.isLoading;
export const getIsNotFound = state => state.isNotFound;
export const getError = state => state.error;
