import { handleHttpError } from "./HttpError";

export const getBlogPostComments = blogPostId => {
  return fetch(`/api/BlogPostComment?blogPostId=${blogPostId}`)
    .then(handleHttpError)
    .then(response => response.json());
};
