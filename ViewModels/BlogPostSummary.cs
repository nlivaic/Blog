using System;

namespace Blog.Models.ViewModels
{
    public class BlogPostSummary
    {
        public BlogPostSummary(Guid id, string title, string text, Author author)
        {
            Id = id;
            Title = title;
            SummaryText = $"{text.Substring(0, 10)}...";
            Author = author;
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string SummaryText { get; set; }
        public Author Author { get; set; }
    }
}