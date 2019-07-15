import { combineReducers } from "redux";
import blogPostsSummaries, * as fromBlogPostsSummaries from "./BlogPostsSummaries";
import blogPost, * as fromBlogPost from "./BlogPost";
import blogPostComments, * as fromBlogPostComments from "./BlogPostComments";

export default combineReducers({
  blogPostsSummaries,
  blogPost,
  blogPostComments
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

export const getBlogPostCommentsError = state =>
  fromBlogPostComments.getError(state.blogPostComments);
