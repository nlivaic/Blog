import HttpError from "./HttpError";

export const getBlogPost = id => {
  return fetch(`/api/BlogPost/${id}`)
    .then(handleHttpError)
    .then(response => response.json());
};

const handleHttpError = response => {
  if (!response.ok) {
    debugger;
    throw new HttpError(response.status, response.statusText);
  }
  return response;
};
