using System;

namespace Blog.Models
{
    public class Comment
    {
        protected Comment() { }

        public Comment(string text, Guid authorId, Guid blogPostId)
        {
            Text = text;
            AuthorId = authorId;
            BlogPostId = blogPostId;
        }

        public Guid Id { get; private set; }
        public string Text { get; private set; }
        public Guid AuthorId { get; private set; }
        public Author Author { get; private set; }
        public Guid BlogPostId { get; private set; }
    }
}