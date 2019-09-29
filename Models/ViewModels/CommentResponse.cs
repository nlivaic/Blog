namespace Blog.Models.ViewModels
{
    public class CommentResponse
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public AuthorViewModel Author { get; set; }
        public string BlogPostId { get; set; }

        public CommentResponse(string id, string text, AuthorViewModel author, string blogPostId)
        {
            Id = id;
            Text = text;
            Author = author;
            BlogPostId = blogPostId;
        }
    }
}