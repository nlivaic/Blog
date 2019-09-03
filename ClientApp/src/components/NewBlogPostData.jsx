import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getBlogPost, getIsRequestingSaveBlogPost } from "../reducers";
import { actionCreators as blogPostActionCreators } from "../reducers/BlogPost";
import BlogPostEdit from "./BlogPostEdit";

class NewBlogPostData extends Component {
  render() {
    const {
      blogPost,
      cancelBlogPostEditing,
      createBlogPost,
      isSaving
    } = this.props;
    return (
      <BlogPostEdit
        blogPost={blogPost}
        cancelBlogPostChanges={cancelBlogPostEditing}
        isSaving={isSaving}
        saveBlogPost={createBlogPost}
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    blogPost: getBlogPost(state),
    isSaving: getIsRequestingSaveBlogPost(state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    dispatch => bindActionCreators(blogPostActionCreators, dispatch)
  )(NewBlogPostData)
);
