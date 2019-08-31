import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import throttle from "lodash/throttle";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { loadState, saveState } from "../localStorage";
import reducers from "../reducers";

export const history = createBrowserHistory();

export default () => {
  const middleware = [];
  middleware.push(routerMiddleware(history));
  middleware.push(thunk);
  middleware.push(logger);
  const store = createStore(
    reducers(history),
    loadState(),
    compose(applyMiddleware(...middleware))
  );
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );
  return store;
};
