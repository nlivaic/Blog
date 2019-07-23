import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogPostsList from "./BlogPostsList";
import BlogPostData from "./BlogPostData";
import AuthorData from "./AuthorData";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={BlogPostsList} />
          <Route path="/BlogPost/:id" exact component={BlogPostData} />
          <Route path="/Author/:id" exact component={AuthorData} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Root;
