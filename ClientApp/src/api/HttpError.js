class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const handleHttpError = response => {
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  return response;
};

export default HttpError;
