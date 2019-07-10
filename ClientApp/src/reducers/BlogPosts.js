import { combineReducers } from "redux";

const requestBlogPostsType = "REQUEST_BLOG_POSTS";
const receiveBlogPostsType = "RECEIVE_BLOG_POSTS";

export const actionCreators = {
  requestBlogPosts: () => dispatch => {
    dispatch({ type: requestBlogPostsType });
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
      return [...state];
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
