import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ blogPost }) => {
  debugger;
  return (
    <div>
      <h3>{blogPost.title}</h3>
      <Link to="/author">{blogPost.author.name}</Link>
      <p>{blogPost.text}</p>
    </div>
  );
};

export default BlogPost;
