import React, { Component } from "react";
import { Link } from "react-router-dom";

class BlogPostEdit extends Component {
  state = {
    text: this.props.blogPost.text,
    title: this.props.blogPost.title
  };
  render() {
    const {
      blogPost,
      cancelBlogPostChanges,
      id,
      isSaving,
      saveBlogPost
    } = this.props;
    return (
      <div>
        Now editing: Title:{" "}
        <input
          onChange={e => this.setState({ title: e.target.value })}
          type="text"
          value={this.state.title}
        />
        <Link to={`/Author/${blogPost.author.id}`}>{blogPost.author.name}</Link>
        <input
          onChange={e => {
            this.setState({ text: e.target.value });
          }}
          type="textarea"
          value={this.state.text}
        />
        {isSaving && "Saving..."}
        {!isSaving && (
          <button
            onClick={() => {
              saveBlogPost(
                new BlogPostRequest(id, this.state.title, this.state.text)
              );
            }}
          >
            Save
          </button>
        )}
        <button onClick={cancelBlogPostChanges}>Cancel</button>
      </div>
    );
  }
}

class BlogPostRequest {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

export default BlogPostEdit;
