using System;
using System.Collections.Generic;
using Blog.Models;

namespace Blog.Models.ViewModels
{
    public class BlogPostRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }

        public BlogPost CreateBlogPost(Guid authorId)
        {
            return new BlogPost(Title, Text, authorId);
        }
    }
}