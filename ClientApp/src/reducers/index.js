import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import account, * as fromAccount from "./Account";
import author, * as fromAuthor from "./Author";
import blogPost, * as fromBlogPost from "./BlogPost";
import blogPostComments, * as fromBlogPostComments from "./BlogPostComments";
import blogPostsSummaries, * as fromBlogPostsSummaries from "./BlogPostsSummaries";

export default history =>
  combineReducers({
    account,
    author,
    blogPost,
    blogPostComments,
    blogPostsSummaries,
    router: connectRouter(history)
  });

// Top-level selectors - Blog Post Summaries
export const getAllBlogPostsSummaries = state =>
  fromBlogPostsSummaries.getAllBlogPostsSummaries(state.blogPostsSummaries);

export const getBlogPostsSummariesIsLoading = state =>
  fromBlogPostsSummaries.getIsLoading(state.blogPostsSummaries);

// Top-level selectors - Blog Post
export const getBlogPost = state => fromBlogPost.getBlogPost(state.blogPost);

export const getBlogPostIsLoading = state =>
  fromBlogPost.getIsLoading(state.blogPost);

export const getBlogPostIsNotFound = state =>
  fromBlogPost.getIsNotFound(state.blogPost);

export const getBlogPostError = state => fromBlogPost.getError(state.blogPost);

export const getBlogPostIsOwner = state =>
  fromBlogPost.getIsOwner(state.blogPost);

export const getBlogPostIsEditing = state =>
  fromBlogPost.getIsEditing(state.blogPost);

export const getIsRequestingSaveBlogPost = state =>
  fromBlogPost.getIsRequestingSaveBlogPost(state.blogPost);

// Top-level selectors - Blog Post Comments
export const getBlogPostComments = state =>
  fromBlogPostComments.getComments(state.blogPostComments);

export const getBlogPostCommentsIsLoading = state =>
  fromBlogPostComments.getIsLoading(state.blogPostComments);

export const getBlogPostCommentsIsNotFound = state =>
  fromBlogPostComments.getIsNotFound(state.blogPostComments);

export const getBlogPostIsNoComments = state =>
  fromBlogPostComments.getIsNoComments(state.blogPostComments);

export const getBlogPostCommentsError = state =>
  fromBlogPostComments.getError(state.blogPostComments);

// Top-level selectors - Author
export const getAuthor = state => fromAuthor.getAuthor(state.author);

export const getAuthorIsLoading = state =>
  fromAuthor.getIsLoading(state.author);

export const getAuthorIsNotFound = state =>
  fromAuthor.getIsNotFound(state.author);

export const getAuthorError = state => fromAuthor.getError(state.author);

// Top-level selectors
export const getAccountRegistration = state =>
  fromAccount.getRegistration(state.account);

export const getAccountIsRegistering = state =>
  fromAccount.getIsRegistering(state.account);

export const getAccountLogin = state => fromAccount.getLogin(state.account);

export const getAccountIsLoggingIn = state =>
  fromAccount.getIsLoggingIn(state.account);

export const getAccountIsLoggingOut = state =>
  fromAccount.getIsLoggingOut(state.account);
