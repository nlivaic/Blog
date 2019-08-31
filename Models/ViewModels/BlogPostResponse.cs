using System;
using System.Collections.Generic;

namespace Blog.Models.ViewModels
{
    public class BlogPostResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public Guid AuthorId { get; set; }
        public Author Author { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public bool IsOwner { get; set; }

        public static BlogPostResponse FromBlogPost(BlogPost blogPost, bool isOwner)
        {
            return new BlogPostResponse
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                Text = blogPost.Text,
                AuthorId = blogPost.AuthorId,
                Author = blogPost.Author,
                Comments = blogPost.Comments,
                IsOwner = isOwner
            };
        }

    }
}