import { push } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";

const NewBlogPost = ({ push }) => {
  return <button onClick={push}>New Blog Post</button>;
};

const mapDispatchToProps = dispatch => {
  return {
    push: () => {
      dispatch(push("/NewBlogPost"));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewBlogPost);
