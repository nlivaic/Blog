import React from "react";
import { Link } from "react-router-dom";

const BlogPostSummary = ({ blogPost }) => {
  return (
    <div>
      <h4>
        <Link to={`/BlogPost/${blogPost.id}`}>{blogPost.title}</Link>
      </h4>
      <h6>{blogPost.author.name}</h6>
      <p>{blogPost.summaryText}</p>
    </div>
  );
};

export default BlogPostSummary;
