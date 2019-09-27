using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.DataProtection;
using Blog.Models;
using Blog.Security;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class BlogPostCommentController : ControllerBase
    {
        private readonly BlogContext _ctx;
        private readonly IDataProtectionProvider _provider;
        private readonly IDataProtector _blogPostProtector;
        private readonly PurposeStringConstants _purposeStrings;

        public BlogPostCommentController(BlogContext ctx, IDataProtectionProvider _provider, PurposeStringConstants purposeStrings)
        {
            _ctx = ctx;
            _blogPostProtector = _provider.CreateProtector(purposeStrings.BlogPostId);
            _purposeStrings = purposeStrings;
        }

        [HttpGet]
        public IActionResult Get([FromQuery(Name = "blogPostId")]string blogPostId)
        {
            Guid id = new Guid(_blogPostProtector.Unprotect(blogPostId));
            ICollection<Comment> comments = _ctx.Comments.Include(c => c.Author).Where(c => c.BlogPostId == id).ToList();
            return Ok(comments);
        }
    }
}