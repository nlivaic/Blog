import React, { Component } from "react";

class BlogPostEdit extends Component {
  state = {
    text: this.props.blogPost.text,
    title: this.props.blogPost.title
  };

  componentDidUpdate(prevProps) {
    if (this.props.blogPost.title !== prevProps.blogPost.title) {
      this.setState({ title: this.props.blogPost.title });
    }
    if (this.props.blogPost.text !== prevProps.blogPost.text) {
      this.setState({ text: this.props.blogPost.text });
    }
  }

  render() {
    const {
      cancelBlogPostChanges,
      id,
      isSaving,
      saveBlogPost,
      showCancel
    } = this.props;
    return (
      <div>
        Title:
        <input
          onChange={e => this.setState({ title: e.target.value })}
          type="text"
          value={this.state.title}
        />
        <br />
        Text:
        <input
          onChange={e => {
            this.setState({ text: e.target.value });
          }}
          type="textarea"
          value={this.state.text}
        />
        <br />
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
        {showCancel && <button onClick={cancelBlogPostChanges}>Cancel</button>}
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
