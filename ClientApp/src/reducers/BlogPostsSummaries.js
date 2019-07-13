import { combineReducers } from "redux";
import * as api from "../api/blogPostsSummaries";

const requestBlogPostsType = "REQUEST_BLOG_POSTS";
const receiveBlogPostsType = "RECEIVE_BLOG_POSTS";

export const actionCreators = {
  requestBlogPosts: () => dispatch => {
    dispatch({ type: requestBlogPostsType });
    api
      .getBlogPostsSummaries()
      .then(data => dispatch({ type: receiveBlogPostsType, response: data }));
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case receiveBlogPostsType:
      return state;
    default:
      return state;
  }
};

const blogPostList = (state = [], action) => {
  switch (action.type) {
    case receiveBlogPostsType:
      return [...action.response];
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case requestBlogPostsType:
      return true;
    case receiveBlogPostsType:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ byId, blogPostList, isLoading });

// Selectors
export const getAllBlogPostsSummaries = state => state.blogPostList;

export const getIsLoading = state => state.isLoading;
