import { combineReducers } from "redux";

const requestBlogPostType = "REQUEST_BLOG_POST";
const receiveBlogPostType = "RECEIVE_BLOG_POST";
const initialState = { title: "", text: "", author: { id: "", name: "" } };

export const actionCreators = {
  requestBlogPost: id => dispatch => {
    dispatch({ type: requestBlogPostType });
    fetch(`/api/BlogPost/${id}`)
      .then(data => data.json())
      .then(data => dispatch({ type: receiveBlogPostType, response: data }));
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
      return false;
    default:
      return state;
  }
};

export default combineReducers({ blogPost, isLoading });

// selectors
export const getBlogPost = state => state.blogPost;

export const getIsLoading = state => state.isLoading;
