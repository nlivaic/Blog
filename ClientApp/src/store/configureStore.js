import { createBrowserHistory } from "history";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createStore, compose, applyMiddleware } from "redux";
import reducers from "../reducers";

export const history = createBrowserHistory();

export default () => {
  const middleware = [];
  middleware.push(routerMiddleware(history));
  middleware.push(thunk);
  middleware.push(logger);
  return createStore(
    reducers(history),
    compose(applyMiddleware(...middleware))
  );
};
