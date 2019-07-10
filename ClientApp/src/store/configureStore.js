import logger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";

export default () => {
  const middleware = [];
  middleware.push(thunk);
  middleware.push(logger);
  return createStore(reducers, applyMiddleware(...middleware));
};
