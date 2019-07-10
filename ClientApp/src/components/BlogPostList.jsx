import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../reducers/BlogPosts";

class BlogPostList extends Component {
  render() {
    const { requestBlogPosts } = this.props;

    return (
      <div>
        <p>This is a blog post list</p>
        <button onClick={requestBlogPosts}>Request Blog Posts</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(BlogPostList);
