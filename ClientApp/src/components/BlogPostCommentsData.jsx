import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BlogPostComments from "./BlogPostComments";
import {
  getBlogPostComments,
  getBlogPostCommentsIsLoading,
  getBlogPostIsNoComments
} from "../reducers";
import { actionCreators } from "../reducers/BlogPostComments";

class BlogPostCommentsData extends Component {
  componentWillUnmount() {
    const { resetBlogPostComments } = this.props;
    resetBlogPostComments();
  }
  render() {
    const {
      comments,
      requestBlogPostComments,
      blogPostId,
      isLoading,
      isNoComments
    } = this.props;
    if (isLoading) return <p>Loading...</p>;
    if (isNoComments) return <p>No comments yet.</p>;
    if (comments.length === 0) {
      return (
        <button onClick={() => requestBlogPostComments(blogPostId)}>
          Show Comments
        </button>
      );
    }
    if (comments.length > 0) {
      return <BlogPostComments comments={comments} />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogPostId: ownProps.blogPostId,
    comments: getBlogPostComments(state),
    isLoading: getBlogPostCommentsIsLoading(state),
    isNoComments: getBlogPostIsNoComments(state)
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(BlogPostCommentsData);
