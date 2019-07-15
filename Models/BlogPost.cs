using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public class BlogPost
    {
        protected BlogPost()
        {

        }

        public BlogPost(string title, string text, Guid authorId)
        {
            Id = Guid.NewGuid();
            Title = title;
            Text = text;
            AuthorId = authorId;
        }

        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string Text { get; private set; }
        public Guid AuthorId { get; private set; }
        public Author Author { get; private set; }
        public ICollection<Comment> Comments { get; private set; }
    }
}