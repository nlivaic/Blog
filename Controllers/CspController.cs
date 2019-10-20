using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Blog.Controllers
{
    public class CspController : ControllerBase
    {
        private readonly ILogger<CspController> _logger;

        public CspController(ILogger<CspController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Violations(object violation)
        {
            _logger.LogWarning("violation");
            return Ok(string.Empty);
        }
    }
}