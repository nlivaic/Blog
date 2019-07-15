using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Blog.Models;
using Blog.ViewModels;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class BlogPostController : ControllerBase
    {
        public BlogContext _ctx { get; set; }
        public BlogPostController(BlogContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ctx.BlogPosts.Include(bp => bp.Author).Select(bp => new BlogPostSummary(bp.Id, bp.Title, bp.Text, bp.Author)).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            BlogPost blogPost = _ctx.BlogPosts.Include(bp => bp.Author).SingleOrDefault(bp => bp.Id == id);
            if (blogPost == null)
                return NotFound();
            return Ok(blogPost);
        }
    }
}