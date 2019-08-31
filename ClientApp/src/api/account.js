import { handleHttpError } from "./HttpError";

export const register = registerCredentials => {
  return fetch("/api/account/register", {
    method: "POST",
    body: JSON.stringify(registerCredentials),
    headers: { "Content-Type": "application/json" }
  })
    .then(handleHttpError)
    .then(response => response.json());
};

export const login = loginCredentials => {
  return fetch("/api/account/login", {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: { "Content-Type": "application/json" }
  })
    .then(handleHttpError)
    .then(response => response.json());
};

export const logout = () => {
  return fetch("/api/account/logout")
    .then(handleHttpError)
    .then(response => response.json());
};
