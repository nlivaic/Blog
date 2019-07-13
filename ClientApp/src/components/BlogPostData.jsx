import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getBlogPostIsLoading, getBlogPost } from "../reducers";
import { actionCreators } from "../reducers/BlogPost";
import BlogPost from "./BlogPost";

class BlogPostData extends Component {
  componentDidMount() {
    const { requestBlogPost, id } = this.props;
    requestBlogPost(id);
  }

  render() {
    const { isLoading, blogPost } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <BlogPost blogPost={blogPost} />
        <Link to="/">Back</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    isLoading: getBlogPostIsLoading(state),
    blogPost: getBlogPost(state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(BlogPostData)
);
