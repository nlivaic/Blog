using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class FooController : ControllerBase
    {
        [Route("Index")]
        [HttpGet]
        public string Index()
        {
            return "Accessing an authorized action.";
        }
    }
}