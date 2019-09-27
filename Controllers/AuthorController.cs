using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Blog.Models;
using Blog.Models.ViewModels;
using Microsoft.AspNetCore.DataProtection;
using Blog.Security;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly BlogContext _ctx;
        private readonly IDataProtector _blogPostProtector;
        private readonly IDataProtector _authorProtector;
        private readonly IDataProtectionProvider _protectionProvider;
        private readonly PurposeStringConstants _purposeStrings;

        public AuthorController(BlogContext ctx, IDataProtectionProvider protectionProvider, PurposeStringConstants purposeStrings)
        {
            _ctx = ctx;
            _protectionProvider = protectionProvider;
            _purposeStrings = purposeStrings;
            _blogPostProtector = _protectionProvider.CreateProtector(_purposeStrings.BlogPostId);
            _authorProtector = _protectionProvider.CreateProtector(_purposeStrings.AuthorId);
        }

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute]string id)
        {
            Guid authorId = new Guid(_authorProtector.Unprotect(id));
            AuthorSummary author = _ctx.Authors.Include(a => a.BlogPosts)
                .Where(a => a.Id == authorId)
                .Select(a => new AuthorSummary(
                    a.Name,
                    new List<BlogPostSummary>(a.BlogPosts
                        .Select(bp => new BlogPostSummary(_blogPostProtector.Protect(bp.Id.ToString()), bp.Title, bp.Text)))))
                .SingleOrDefault();
            if (author == null)
            {
                return NotFound();
            }
            return Ok(author);
        }
    }
}