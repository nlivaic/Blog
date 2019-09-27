using System;
using System.Text.RegularExpressions;

namespace Blog.Models.ViewModels
{
    public class BlogPostSummary
    {
        public BlogPostSummary(string id, string title, string text, AuthorViewModel author)
        {
            Id = id;
            Title = title;
            SummaryText = $"{Regex.Match(text, "^(.){1,10}").Value}...";
            Author = author;
        }
        public BlogPostSummary(string id, string title, string text)
        {
            Id = id;
            Title = title;
            SummaryText = $"{Regex.Match(text, "^(.){1,10}").Value}...";
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string SummaryText { get; set; }
        public AuthorViewModel Author { get; set; }
    }
}