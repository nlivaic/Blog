import React from "react";
import { Link } from "react-router-dom";

const BlogPostComments = ({ comments }) => {
  return (
    <div>
      {comments.map(c => (
        <div key={c.id}>
          {c.text} by <Link to={`author/${c.author.id}`}>{c.author.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogPostComments;
