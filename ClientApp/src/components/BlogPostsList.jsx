import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../reducers/BlogPostsSummaries";
import {
  getAllBlogPostsSummaries,
  getBlogPostsSummariesIsLoading
} from "../reducers";
import BlogPostSummary from "./BlogPostSummary";

class BlogPostsList extends Component {
  componentDidMount() {
    const { requestBlogPosts } = this.props;
    requestBlogPosts();
  }

  render() {
    const { isLoading, blogPostsList } = this.props;
    if (isLoading) return <p>Loading...</p>;
    return (
      <div>
        {blogPostsList.map(bp => (
          <BlogPostSummary key={bp.id} blogPost={bp} showAuthor={true} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogPostsList: getAllBlogPostsSummaries(state),
    isLoading: getBlogPostsSummariesIsLoading(state)
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(BlogPostsList);
