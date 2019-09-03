import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AccountData from "./AccountData";
import AuthorData from "./AuthorData";
import BlogPostData from "./BlogPostData";
import BlogPostsList from "./BlogPostsList";
import NewBlogPost from "./NewBlogPost";
import NewBlogPostData from "./NewBlogPostData";
import RegisterNewUserData from "./RegisterNewUserData";

const Root = ({ history, store }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AccountData />
        <NewBlogPost />
        <hr />
        <Switch>
          <Route component={BlogPostsList} exact path="/" />
          <Route component={NewBlogPostData} exact path="/NewBlogPost" />
          <Route component={BlogPostData} exact path="/BlogPost/:id" />
          <Route component={AuthorData} exact path="/Author/:id" />
          <Route component={RegisterNewUserData} exact path="/Register" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
