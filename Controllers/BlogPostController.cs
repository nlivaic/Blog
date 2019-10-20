using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Blog.Models;
using Blog.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Blog.Security;
using Ganss.XSS;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class BlogPostController : ControllerBase
    {
        private readonly BlogContext _ctx;
        private readonly IDataProtectionProvider _protectionProvider;
        private readonly PurposeStringConstants _purposeStrings;
        private readonly HtmlSanitizer _sanitizer;
        private readonly IDataProtector _blogPostProtector;
        private readonly IDataProtector _authorProtector;

        public BlogPostController(BlogContext ctx, IDataProtectionProvider protectionProvider, PurposeStringConstants purposeStrings, HtmlSanitizer sanitizer)
        {
            _ctx = ctx;
            _protectionProvider = protectionProvider;
            _purposeStrings = purposeStrings;
            _sanitizer = sanitizer;
            _blogPostProtector = _protectionProvider.CreateProtector(_purposeStrings.BlogPostId);
            _authorProtector = _protectionProvider.CreateProtector(_purposeStrings.AuthorId);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(
                _ctx.BlogPosts
                    .Include(bp => bp.Author)
                    .Select(bp => new BlogPostSummary(
                        _blogPostProtector.Protect(bp.Id.ToString()),
                        bp.Title,
                        bp.Text,
                        new AuthorViewModel(
                            _authorProtector.Protect(bp.Author.Id.ToString()),
                            bp.Author.Name)
                        )).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute]string id)
        {
            Guid blogPostId = new Guid(_blogPostProtector.Unprotect(id));
            var currentUserId = HttpContext.User.FindFirst("authorId")?.Value;
            BlogPost blogPost = _ctx.BlogPosts.Include(bp => bp.Author).SingleOrDefault(bp => bp.Id == blogPostId);
            if (blogPost == null)
            {
                return NotFound();
            }
            bool isCurrentUserAuthor = string.IsNullOrEmpty(currentUserId) ? false : new Guid(currentUserId).Equals(blogPost.AuthorId);
            return Ok(BlogPostResponse.FromBlogPost(
                _blogPostProtector.Protect(blogPostId.ToString()),
                blogPost,
                new AuthorViewModel(
                    _authorProtector.Protect(blogPost.Author.Id.ToString()),
                    blogPost.Author.Name),
                 isCurrentUserAuthor));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Policy = "authorPolicy")]
        public async Task<IActionResult> Post([FromBody]BlogPostRequest blogPostRequest)
        {
            var authorId = new Guid(HttpContext.User.FindFirst("authorId").Value);
            blogPostRequest.Title = _sanitizer.Sanitize(blogPostRequest.Title); // Post value: <div onload=alert('xss')>Title</div>
            blogPostRequest.Text = _sanitizer.Sanitize(blogPostRequest.Text);   // Post value: <script type="text/javascript">alert('text')</script>
            var blogPost = blogPostRequest.CreateBlogPost(authorId);
            await _ctx.BlogPosts.AddAsync(blogPost);
            await _ctx.SaveChangesAsync();
            var blogPostResponse = BlogPostResponse.FromBlogPost(
                _blogPostProtector.Protect(blogPost.Id.ToString()),
                blogPost,
                true
            );
            return CreatedAtAction(nameof(Get), new { id = _blogPostProtector.Protect(blogPost.Id.ToString()) }, blogPostResponse);
        }

        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        [Authorize(Policy = "authorPolicy")]
        public async Task<IActionResult> Put([FromRoute]Guid id, [FromBody]BlogPostRequest blogPostRequest)
        {
            BlogPost blogPost = _ctx.BlogPosts.SingleOrDefault(bp => bp.Id == id);
            if (blogPost == null)
            {
                return NotFound("Blog Post not found.");
            }
            var authorId = new Guid(HttpContext.User.FindFirst("authorId").Value);
            if (blogPost.AuthorId != authorId)
            {
                return Forbid("Authenticated user cannot update this blog post.");
            }
            blogPost.Update(blogPostRequest.Title, blogPostRequest.Text);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        [Authorize(Policy = "authorPolicy")]
        public async Task<IActionResult> Delete([FromRoute]string id)
        {
            var authorId = new Guid(HttpContext.User.FindFirst("authorId").Value);
            var blogPost = _ctx.BlogPosts.SingleOrDefault(bp => bp.Id == new Guid(_blogPostProtector.Unprotect(id)));
            if (blogPost == null)
            {
                return NotFound("Blog Post not found");
            }
            if (blogPost.AuthorId != authorId)
            {
                return Forbid("Authenticated user cannot delete this blog post.");
            }
            _ctx.BlogPosts.Remove(blogPost);
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}