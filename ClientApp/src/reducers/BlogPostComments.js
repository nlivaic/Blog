import { combineReducers } from "redux";
import * as api from "../api/blogPostComments";

const requestBlogPostCommentsType = "REQUEST_BLOG_POST_COMMENTS";
const receiveBlogPostCommentsType = "RECEIVE_BLOG_POST_COMMENTS";
const notFoundBlogPostCommentsType = "NOT_FOUND_BLOG_POST_COMMENTS";
const resetBlogPostCommentsType = "RESET_BLOG_POST_COMMENTS";
const noCommentsType = "NO_BLOG_POST_COMMENTS";
const errorType = "ERROR_BLOG_POST_COMMENTS";
const initialErrorState = { isError: false, message: "" };

export const actionCreators = {
  requestBlogPostComments: blogPostId => dispatch => {
    dispatch({ type: requestBlogPostCommentsType });
    api
      .getBlogPostComments(blogPostId)
      .then(data => {
        if (data.length === 0) {
          dispatch({ type: noCommentsType });
        } else {
          dispatch({ type: receiveBlogPostCommentsType, response: data });
        }
      })
      .catch(error => {
        switch (error.status) {
          case 404:
            dispatch({ type: notFoundBlogPostCommentsType });
            break;
          default:
            dispatch({
              type: errorType,
              response: `An error occurred trying to fetch comments for blog post ${blogPostId}: ${
                error.message
              }.`
            });
            break;
        }
      });
  },
  resetBlogPostComments: () => dispatch => {
    dispatch({ type: resetBlogPostCommentsType });
  }
};

const comments = (state = [], action) => {
  switch (action.type) {
    case receiveBlogPostCommentsType:
      return action.response;
    case resetBlogPostCommentsType:
      return [];
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case requestBlogPostCommentsType:
      return true;
    case receiveBlogPostCommentsType:
    case notFoundBlogPostCommentsType:
    case resetBlogPostCommentsType:
    case noCommentsType:
    case errorType:
      return false;
    default:
      return state;
  }
};

const isNotFound = (state = false, action) => {
  switch (action.type) {
    case notFoundBlogPostCommentsType:
      return true;
    case receiveBlogPostCommentsType:
    case resetBlogPostCommentsType:
      return false;
    default:
      return state;
  }
};

const isNoComments = (state = false, action) => {
  switch (action.type) {
    case noCommentsType:
      return true;
    case resetBlogPostCommentsType:
      return false;
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
    case receiveBlogPostCommentsType:
      return initialErrorState;
    default:
      return state;
  }
};

export default combineReducers({
  comments,
  isLoading,
  isNotFound,
  isNoComments,
  error
});

// Selectors
export const getComments = state => state.comments;

export const getIsLoading = state => state.isLoading;

export const getIsNotFound = state => state.isNotFound;

export const getIsNoComments = state => state.isNoComments;

export const getError = state => state.error;
