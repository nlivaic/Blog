using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Blog.Models;
using Blog.Models.Identity;
using Blog.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<BlogIdentityUser> _userManager;
        private readonly SignInManager<BlogIdentityUser> _signInManager;
        private readonly BlogContext _blogContext;

        public AccountController(UserManager<BlogIdentityUser> userManager, SignInManager<BlogIdentityUser> signInManager, BlogContext blogContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _blogContext = blogContext;
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel registerModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new RegisterResponse(false, "Could not register."));
            }
            Author author = new Author(registerModel.Name);
            _blogContext.Authors.Add(author);
            await _blogContext.SaveChangesAsync();
            BlogIdentityUser user = new BlogIdentityUser { UserName = registerModel.Email, Email = registerModel.Email, Name = registerModel.Name };
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            await _userManager.AddClaimAsync(user, new Claim("userType", "author"));
            await _userManager.AddClaimAsync(user, new Claim("authorId", author.Id.ToString(), "string"));
            if (result.Succeeded)
            {
                return Ok(new RegisterResponse(true, "Registered successfully."));
            }
            else
            {
                return Ok(new RegisterResponse(false,
                    result.Errors.Aggregate(string.Empty, (errorMessageAcc, error) => errorMessageAcc + ", " + error.Description)));
            }
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginViewModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new LoginResponse(false, "Erroneous credentials."));
            }
            var result = await _signInManager.PasswordSignInAsync(loginModel.Email, loginModel.Password, isPersistent: true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return Ok(new LoginResponse(true, _userManager.Users.First().Name, "Logged in successfully."));
            }
            else
            {
                return Ok(new LoginResponse(false, "Username and/or password do not exist."));
            }
        }

        [Route("Logout")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new LoginResponse(false, string.Empty));
        }
    }
}