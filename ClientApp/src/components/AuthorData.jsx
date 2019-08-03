import { goBack } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAuthor,
  getAuthorIsLoading,
  getAuthorIsNotFound,
  getAuthorError
} from "../reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducers/Author";
import NotFound from "./NotFound";
import BlogPostSummary from "./BlogPostSummary";

class AuthorData extends Component {
  componentDidMount() {
    const { id, requestAuthor } = this.props;
    requestAuthor(id);
  }
  render() {
    const { author, isLoading, isNotFound, goBack } = this.props;
    if (isLoading) return <p>Loading...</p>;
    if (isNotFound) return <NotFound />;
    return (
      <div>
        <p>{author.name}</p>
        {author.blogPostSummaries.map(blogPost => (
          <BlogPostSummary
            key={blogPost.id}
            showAuthor={false}
            blogPost={blogPost}
          />
        ))}
        <button onClick={goBack}>Back</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    author: getAuthor(state),
    isLoading: getAuthorIsLoading(state),
    isNotFound: getAuthorIsNotFound(state),
    error: getAuthorError(state)
  };
};

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators(actionCreators, dispatch);
  actions["goBack"] = () => dispatch(goBack());
  return actions;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorData);
