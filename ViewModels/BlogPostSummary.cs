using System;
using System.Text.RegularExpressions;

namespace Blog.Models.ViewModels
{
    public class BlogPostSummary
    {
        public BlogPostSummary(Guid id, string title, string text, Author author)
        {
            Id = id;
            Title = title;
            SummaryText = $"{Regex.Match(text, "^(.){1,10}").Value}...";
            Author = author;
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string SummaryText { get; set; }
        public Author Author { get; set; }
    }
}