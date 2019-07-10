import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import Root from "./components/Root";
import configureStore from "./store/configureStore";

const rootElement = document.getElementById("root");

const store = configureStore();

ReactDOM.render(<Root store={store} />, rootElement);

registerServiceWorker();
