using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class CorsController : ControllerBase
    {
        [HttpGet()]
        public IActionResult FromAnotherOrigin()
        {
            return Ok(new { status = "Message from another origin." });
        }
    }
}