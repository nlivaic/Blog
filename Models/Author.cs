using System;
using System.Collections.Generic;

namespace Blog.Models
{
    public class Author
    {
        protected Author()
        {

        }

        public Author(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
        }

        // public Author(string name, ICollection<BlogPost> blogPosts)
        // {
        //     Id = Guid.NewGuid();
        //     Name = name;
        //     BlogPosts = blogPosts;
        // }

        // public void AddBlogPosts(BlogPost blogPost)
        // {
        //     BlogPosts.Add(blogPost);
        // }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public List<BlogPost> BlogPosts { get; private set; }
    }
}