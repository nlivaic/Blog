using System.Collections.Generic;

namespace Blog.Models.ViewModels
{
    public class AuthorViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<BlogPost> BlogPosts { get; set; }

        public AuthorViewModel(string id, string name)
        {
            Id = id;
            Name = name;
            BlogPosts = new List<BlogPost>();
        }

        public AuthorViewModel(string id, string name, List<BlogPost> blogPosts)
        {
            Id = id;
            Name = name;
            BlogPosts = blogPosts;
        }
    }
}