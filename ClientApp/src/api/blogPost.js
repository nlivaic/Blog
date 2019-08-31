import { handleHttpError } from "./HttpError";

export const getBlogPost = id => {
  return fetch(`/api/BlogPost/${id}`)
    .then(handleHttpError)
    .then(response => response.json());
};

export const updateBlogPost = blogPost => {
  return fetch(`/api/BlogPost/${blogPost.id}`, {
    body: JSON.stringify(blogPost),
    headers: { "Content-Type": "application/json" },
    method: "PUT"
  })
    .then(handleHttpError)
    .then(response => {
      if (response.status !== 204) {
        return response.json();
      } else {
        return response;
      }
    });
};
