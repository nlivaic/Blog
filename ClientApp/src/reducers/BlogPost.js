import { combineReducers } from "redux";
import * as api from "../api/blogPost";

const requestBlogPostType = "REQUEST_BLOG_POST";
const receiveBlogPostType = "RECEIVE_BLOG_POST";
const notFoundBlogPostType = "NOT_FOUND_BLOG_POST";
const errorType = "ERROR_BLOG_POST";
const initialState = { title: "", text: "", author: { id: "", name: "" } };
const initialErrorState = { isError: false, message: "" };

export const actionCreators = {
  requestBlogPost: id => dispatch => {
    dispatch({ type: requestBlogPostType });
    api
      .getBlogPost(id)
      .then(data => dispatch({ type: receiveBlogPostType, response: data }))
      .catch(error => {
        switch (error.status) {
          case 404:
            dispatch({ type: notFoundBlogPostType });
            break;
          default:
            dispatch({
              type: errorType,
              response: `An error occurred trying to fetch blog post ${id}: ${
                error.message
              }.`
            });
            break;
        }
      });
  }
};

const blogPost = (state = initialState, action) => {
  switch (action.type) {
    case receiveBlogPostType:
      return action.response;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case requestBlogPostType:
      return true;
    case receiveBlogPostType:
    case notFoundBlogPostType:
    case errorType:
      return false;
    default:
      return state;
  }
};

const isNotFound = (state = false, action) => {
  switch (action.type) {
    case notFoundBlogPostType:
      return true;
    case receiveBlogPostType:
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
    case receiveBlogPostType:
      return initialErrorState;
    default:
      return state;
  }
};

export default combineReducers({ blogPost, isLoading, isNotFound, error });

// selectors
export const getBlogPost = state => state.blogPost;

export const getIsLoading = state => state.isLoading;

export const getIsNotFound = state => state.isNotFound;

export const getError = state => state.error;
