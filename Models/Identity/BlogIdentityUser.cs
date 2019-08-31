using Microsoft.AspNetCore.Identity;

namespace Blog.Models.Identity
{
    public class BlogIdentityUser : IdentityUser
    {
        public string Name { get; set; }
    }
}