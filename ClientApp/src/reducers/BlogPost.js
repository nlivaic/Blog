import { push } from "connected-react-router";
import { combineReducers } from "redux";
import * as api from "../api/blogPost";

const requestBlogPostType = "REQUEST_BLOG_POST";
const receiveBlogPostType = "RECEIVE_BLOG_POST";
const notFoundBlogPostType = "NOT_FOUND_BLOG_POST";
const readBlogPostType = "READ_BLOG_POST";
const editBlogPostType = "EDIT_BLOG_POST";
const requestUpdateBlogPostType = "REQUEST_UPDATE_BLOG_POST";
const receiveUpdateBlogPostType = "RECEIVE_UPDATE_BLOG_POST";
const requestCreateBlogPostType = "REQUEST_CREATE_BLOG_POST";
const receiveCreateBlogPostType = "RECEIVE_CREATE_BLOG_POST";
const requestDeleteBlogPostType = "REQUEST_DELETE_BLOG_POST";
const receiveDeleteBlogPostType = "RECEIVE_DELETE_BLOG_POST";
const resetBlogPostType = "RESET_BLOG_POST";
const errorType = "ERROR_BLOG_POST";
const initialState = {
  author: { id: "", name: "" },
  text: "",
  title: ""
};
const initialErrorState = { isError: false, message: "" };

export const actionCreators = {
  cancelBlogPostEditing: () => dispatch => {
    dispatch({ type: readBlogPostType });
  },
  createBlogPost: blogPost => dispatch => {
    dispatch({ type: requestCreateBlogPostType });
    api
      .createBlogPost(blogPost)
      .then(data => {
        dispatch({ type: receiveCreateBlogPostType });
        return data;
      })
      .then(data => {
        dispatch(push(`/BlogPost/${data.id}`));
      });
  },
  deleteBlogPost: id => dispatch => {
    dispatch({ type: requestDeleteBlogPostType });
    api
      .deleteBlogPost(id)
      .then(() => dispatch({ type: receiveDeleteBlogPostType }))
      .then(() => dispatch(push("/")));
  },
  editBlogPost: () => dispatch => {
    dispatch({ type: editBlogPostType });
  },
  requestBlogPost: id => dispatch => {
    dispatch({ type: requestBlogPostType });
    api
      .getBlogPost(id)
      .then(data => dispatch({ response: data, type: receiveBlogPostType }))
      .catch(error => {
        switch (error.status) {
          case 404:
            dispatch({ type: notFoundBlogPostType });
            break;
          default:
            dispatch({
              response: `An error occurred trying to fetch blog post ${id}: ${
                error.message
              }.`,
              type: errorType
            });
            break;
        }
      });
  },
  resetBlogPost: () => dispatch => {
    dispatch({ type: resetBlogPostType });
  },
  updateBlogPost: blogPost => dispatch => {
    dispatch({ type: requestUpdateBlogPostType });
    api
      .updateBlogPost(blogPost)
      .then(() =>
        dispatch({ data: blogPost, type: receiveUpdateBlogPostType })
      );
  }
};

const blogPost = (state = initialState, action) => {
  switch (action.type) {
    case receiveBlogPostType:
      return action.response;
    case receiveUpdateBlogPostType:
      return { ...state, text: action.data.text, title: action.data.title };
    case resetBlogPostType:
      return initialState;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case errorType:
    case notFoundBlogPostType:
    case receiveBlogPostType:
      return false;
    case requestBlogPostType:
      return true;
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

const isEditing = (state = false, action) => {
  switch (action.type) {
    case editBlogPostType:
      return true;
    case readBlogPostType:
      return false;
    default:
      return state;
  }
};

const isRequestingSaveBlogPost = (state = false, action) => {
  switch (action.type) {
    case receiveCreateBlogPostType:
    case receiveUpdateBlogPostType:
      return false;
    case requestCreateBlogPostType:
    case requestUpdateBlogPostType:
      return true;
    default:
      return state;
  }
};

const isDeleting = (state = false, action) => {
  switch (action.type) {
    case receiveDeleteBlogPostType:
      return false;
    case requestDeleteBlogPostType:
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
    case receiveBlogPostType:
      return initialErrorState;
    default:
      return state;
  }
};

export default combineReducers({
  blogPost,
  error,
  isDeleting,
  isEditing,
  isLoading,
  isNotFound,
  isRequestingSaveBlogPost
});

// selectors
export const getBlogPost = state => state.blogPost;

export const getIsLoading = state => state.isLoading;

export const getIsNotFound = state => state.isNotFound;

export const getError = state => state.error;

export const getIsOwner = state => state.blogPost.isOwner;

export const getIsEditing = state => state.isEditing;

export const getIsRequestingSaveBlogPost = state =>
  state.isRequestingSaveBlogPost;

export const getIsDeleting = state => state.isDeleting;
