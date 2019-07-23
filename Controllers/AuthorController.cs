using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Blog.Models;
using Blog.ViewModels;

namespace Namespace
{
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly BlogContext _ctx;
        public AuthorController(BlogContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            AuthorSummary author = _ctx.Authors.Include(a => a.BlogPosts)
                .Where(a => a.Id == id)
                .Select(a => new AuthorSummary(a.Name, new List<BlogPostSummary>(a.BlogPosts.Select(bp => new BlogPostSummary(bp.Id, bp.Title, bp.Text, bp.Author)))))
                .SingleOrDefault();
            if (author == null)
            {
                return NotFound();
            }
            return Ok(author);
        }
    }
}