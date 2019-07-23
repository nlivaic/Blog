import { handleHttpError } from "./HttpError";

export const getAuthor = id => {
  return fetch(`/api/author/${id}`)
    .then(handleHttpError)
    .then(response => response.json());
};
