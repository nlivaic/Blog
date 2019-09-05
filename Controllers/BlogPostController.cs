using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Blog.Models;
using Blog.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;

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
        public IActionResult Get([FromRoute]Guid id)
        {
            var currentUserId = HttpContext.User.FindFirst("authorId")?.Value;
            BlogPost blogPost = _ctx.BlogPosts.Include(bp => bp.Author).SingleOrDefault(bp => bp.Id == id);
            if (blogPost == null)
            {
                return NotFound();
            }
            bool isCurrentUserAuthor = string.IsNullOrEmpty(currentUserId) ? false : new Guid(currentUserId).Equals(blogPost.AuthorId);
            return Ok(BlogPostResponse.FromBlogPost(blogPost, isCurrentUserAuthor));
        }

        [HttpPost]
        [Authorize(Policy = "authorPolicy")]
        public async Task<IActionResult> Post([FromBody]BlogPostRequest blogPostRequest)
        {
            var authorId = new Guid(HttpContext.User.FindFirst("authorId").Value);
            var blogPost = blogPostRequest.CreateBlogPost(authorId);
            await _ctx.BlogPosts.AddAsync(blogPost);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = blogPost.Id }, blogPost);
        }

        [HttpPut("{id}")]
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
        [Authorize(Policy = "authorPolicy")]
        public async Task<IActionResult> Delete([FromRoute]Guid id)
        {
            var authorId = new Guid(HttpContext.User.FindFirst("authorId").Value);
            var blogPost = _ctx.BlogPosts.SingleOrDefault(bp => bp.Id == id);
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