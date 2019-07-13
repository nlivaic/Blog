import { combineReducers } from "redux";
import blogPostsSummaries, * as fromBlogPostsSummaries from "./BlogPostsSummaries";
import blogPost, * as fromBlogPost from "./BlogPost";

export default combineReducers({ blogPostsSummaries, blogPost });

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

export const getError = state => fromBlogPost.getError(state.blogPost);
