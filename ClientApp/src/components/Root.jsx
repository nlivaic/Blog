import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import BlogPostsList from "./BlogPostsList";
import BlogPostData from "./BlogPostData";
import AuthorData from "./AuthorData";

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={BlogPostsList} />
          <Route path="/BlogPost/:id" exact component={BlogPostData} />
          <Route path="/Author/:id" exact component={AuthorData} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
