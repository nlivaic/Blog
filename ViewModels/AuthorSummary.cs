using System.Collections.Generic;

namespace Blog.ViewModels
{
    public class AuthorSummary
    {
        public AuthorSummary(string name, List<BlogPostSummary> blogPostSummaries)
        {
            Name = name;
            BlogPostSummaries = blogPostSummaries;
        }

        public string Name { get; private set; }
        public List<BlogPostSummary> BlogPostSummaries { get; private set; }
    }
}