using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.DataProtection;
using Blog.Models;
using Blog.Security;
using Blog.Models.ViewModels;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class BlogPostCommentController : ControllerBase
    {
        private readonly BlogContext _ctx;
        private readonly IDataProtectionProvider _provider;
        private readonly IDataProtector _blogPostProtector;
        private readonly IDataProtector _commentProtector;
        private readonly IDataProtector _authorProtector;
        private readonly PurposeStringConstants _purposeStrings;

        public BlogPostCommentController(BlogContext ctx, IDataProtectionProvider provider, PurposeStringConstants purposeStrings)
        {
            _ctx = ctx;
            _provider = provider;
            _blogPostProtector = _provider.CreateProtector(purposeStrings.BlogPostId);
            _commentProtector = _provider.CreateProtector(purposeStrings.CommentId);
            _authorProtector = _provider.CreateProtector(purposeStrings.AuthorId);
            _purposeStrings = purposeStrings;
        }

        [HttpGet]
        public IActionResult Get([FromQuery(Name = "blogPostId")]string blogPostId)
        {
            Guid id = new Guid(_blogPostProtector.Unprotect(blogPostId));
            ICollection<CommentResponse> comments =
                _ctx.Comments
                    .Include(c => c.Author)
                    .Where(c => c.BlogPostId == id)
                    .Select(c =>
                        new CommentResponse(
                            _commentProtector.Protect(c.Id.ToString()),
                            c.Text,
                            new AuthorViewModel(_authorProtector.Protect(c.Author.Id.ToString()), c.Author.Name),
                            _blogPostProtector.Protect(blogPostId)))
                    .ToList();
            return Ok(comments);
        }
    }
}