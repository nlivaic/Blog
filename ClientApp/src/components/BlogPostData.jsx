import { goBack } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  getBlogPost,
  getBlogPostComments,
  getBlogPostError,
  getBlogPostIsEditing,
  getBlogPostIsLoading,
  getBlogPostIsNotFound,
  getBlogPostIsOwner,
  getIsRequestingSaveBlogPost
} from "../reducers";
import { actionCreators as blogPostActionCreators } from "../reducers/BlogPost";
import BlogPost from "./BlogPost";
import BlogPostCommentsData from "./BlogPostCommentsData";
import BlogPostEdit from "./BlogPostEdit";
import Error from "./Error";
import NotFound from "./NotFound";

class BlogPostData extends Component {
  componentDidMount() {
    const { id, requestBlogPost } = this.props;
    requestBlogPost(id);
  }

  render() {
    const {
      blogPost,
      cancelBlogPostEditing,
      editBlogPost,
      error,
      goBack,
      id,
      isEditing,
      isLoading,
      isNotFound,
      isOwner,
      isSaving,
      saveBlogPost
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
        {!isEditing && (
          <BlogPost
            blogPost={blogPost}
            editBlogPost={editBlogPost}
            isOwner={isOwner}
          />
        )}
        {isEditing && (
          <BlogPostEdit
            blogPost={blogPost}
            cancelBlogPostChanges={cancelBlogPostEditing}
            id={id}
            isOwner={isOwner}
            isSaving={isSaving}
            saveBlogPost={saveBlogPost}
          />
        )}
        <BlogPostCommentsData blogPostId={blogPost.id} />
        <br />
        <button onClick={() => goBack()}>Back</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogPost: getBlogPost(state),
    comments: getBlogPostComments(state),
    error: getBlogPostError(state),
    id: ownProps.match.params.id,
    isEditing: getBlogPostIsEditing(state),
    isLoading: getBlogPostIsLoading(state),
    isNotFound: getBlogPostIsNotFound(state),
    isOwner: getBlogPostIsOwner(state),
    isSaving: getIsRequestingSaveBlogPost(state)
  };
};

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators(blogPostActionCreators, dispatch);
  actions["goBack"] = () => dispatch(goBack());
  return actions;
};

export default withRouter(
  connect(
    mapStateToProps,
    //dispatch => bindActionCreators(blogPostActionCreators, dispatch)
    mapDispatchToProps
  )(BlogPostData)
);
