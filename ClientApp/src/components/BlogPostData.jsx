import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getBlogPostIsLoading,
  getBlogPost,
  getBlogPostIsNotFound,
  getBlogPostError,
  getBlogPostComments
} from "../reducers";
import { actionCreators as blogPostActionCreators } from "../reducers/BlogPost";
import { actionCreators as blogPostCommentsActionCreators } from "../reducers/BlogPostComments";
import BlogPost from "./BlogPost";
import BlogPostComments from "./BlogPostComments";
import NotFound from "./NotFound";
import Error from "./Error";

class BlogPostData extends Component {
  componentDidMount() {
    const { blogPostActions, id } = this.props;
    blogPostActions.requestBlogPost(id);
  }

  render() {
    const {
      isLoading,
      blogPost,
      isNotFound,
      error,
      comments,
      blogPostCommentActions
    } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (isNotFound) {
      return <NotFound />;
    }
    if (error.isError) {
      return <Error text={error.message} />;
    }

    return (
      <div>
        <BlogPost blogPost={blogPost} />
        {comments.length === 0 && (
          <button
            onClick={() =>
              blogPostCommentActions.requestBlogPostComments(blogPost.id)
            }
          >
            Show Comments
          </button>
        )}
        {comments.length && <BlogPostComments comments={comments} />}
        <Link to="/">Back</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    isLoading: getBlogPostIsLoading(state),
    isNotFound: getBlogPostIsNotFound(state),
    error: getBlogPostError(state),
    blogPost: getBlogPost(state),
    comments: getBlogPostComments(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    blogPostActions: bindActionCreators(blogPostActionCreators, dispatch),
    blogPostCommentActions: bindActionCreators(
      blogPostCommentsActionCreators,
      dispatch
    )
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    //dispatch => bindActionCreators(blogPostActionCreators, dispatch)
    mapDispatchToProps
  )(BlogPostData)
);
