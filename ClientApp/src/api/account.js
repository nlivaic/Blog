import { handleHttpError } from "./HttpError";

export const register = registerCredentials => {
  return fetch("/api/account/register", {
    body: JSON.stringify(registerCredentials),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  })
    .then(handleHttpError)
    .then(response => response.json());
};

export const login = loginCredentials => {
  return fetch("/api/account/login", {
    body: JSON.stringify(loginCredentials),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  })
    .then(handleHttpError)
    .then(response => response.json());
};

export const logout = () => {
  return fetch("/api/account/logout")
    .then(handleHttpError)
    .then(response => response.json());
};
