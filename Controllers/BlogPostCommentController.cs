using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Blog.Models;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class BlogPostCommentController : ControllerBase
    {
        private BlogContext _ctx { get; set; }

        public BlogPostCommentController(BlogContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public IActionResult Get([FromQuery(Name = "blogPostId")]Guid blogPostId)
        {
            ICollection<Comment> comments = _ctx.Comments.Include(c => c.Author).Where(c => c.BlogPostId == blogPostId).ToList();
            return Ok(comments);
        }
    }
}