import { combineReducers } from "redux";
import blogPostsSummaries, * as fromBlogPostsSummaries from "./BlogPostsSummaries";
import blogPost, * as fromBlogPost from "./BlogPost";

export default combineReducers({ blogPostsSummaries, blogPost });

// Top-level selectors
export const getAllBlogPostsSummaries = state =>
  fromBlogPostsSummaries.getAllBlogPostsSummaries(state.blogPostsSummaries);

export const getBlogPostsSummariesIsLoading = state =>
  fromBlogPostsSummaries.getIsLoading(state.blogPostsSummaries);

export const getBlogPost = state => fromBlogPost.getBlogPost(state.blogPost);

export const getBlogPostIsLoading = state =>
  fromBlogPost.getIsLoading(state.blogPost);
