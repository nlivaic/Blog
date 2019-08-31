import React from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ blogPost, editBlogPost, isOwner }) => {
  return (
    <div>
      <h3>{blogPost.title}</h3>
      <Link to={`/Author/${blogPost.author.id}`}>{blogPost.author.name}</Link>
      <p>{blogPost.text}</p>
      {isOwner && <button onClick={editBlogPost}>Edit</button>}
    </div>
  );
};

export default BlogPost;
