using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public class BlogPost
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string Text { get; private set; }
        public Guid AuthorId { get; private set; }
        public Author Author { get; private set; }
        public ICollection<Comment> Comments { get; private set; }

        protected BlogPost()
        {

        }

        public BlogPost(Guid id, string title, string text, Guid authorId) : this(title, text, authorId)
        {
            Id = id;
        }
        public BlogPost(string title, string text, Guid authorId)
        {
            Id = Guid.NewGuid();
            Title = title;
            Text = text;
            AuthorId = authorId;
        }

        public void Update(string title, string text)
        {
            Title = title;
            Text = text;
        }
    }
}