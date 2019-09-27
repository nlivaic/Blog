using System;
using System.Collections.Generic;

namespace Blog.Models.ViewModels
{
    public class BlogPostResponse
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public AuthorViewModel Author { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public bool IsOwner { get; set; }

        public static BlogPostResponse FromBlogPost(string id, BlogPost blogPost, AuthorViewModel author, bool isOwner)
        {
            return new BlogPostResponse
            {
                Id = id,
                Title = blogPost.Title,
                Text = blogPost.Text,
                Author = author,
                Comments = blogPost.Comments,
                IsOwner = isOwner
            };
        }

    }
}