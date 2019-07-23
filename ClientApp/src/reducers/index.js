import { combineReducers } from "redux";
import blogPostsSummaries, * as fromBlogPostsSummaries from "./BlogPostsSummaries";
import blogPost, * as fromBlogPost from "./BlogPost";
import blogPostComments, * as fromBlogPostComments from "./BlogPostComments";
import author, * as fromAuthor from "./Author";

export default combineReducers({
  blogPostsSummaries,
  blogPost,
  blogPostComments,
  author
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
