import { handleHttpError } from "./HttpError";

export const getBlogPost = id => {
  return fetch(`/api/BlogPost/${id}`)
    .then(handleHttpError)
    .then(response => response.json());
};