import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import BlogPostList from "./BlogPostList";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route to="/" exact component={BlogPostList} />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
