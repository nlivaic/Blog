using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

namespace Security
{
    public interface IXsrfService
    {
        void GetAndStoreToken(HttpContext context);
    }

    public class XsrfService : IXsrfService
    {
        private readonly IAntiforgery _antiforgery;

        public XsrfService(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        /// <summary>
        /// Refresh CSRF cookie and request tokens.
        /// </summary>
        public void GetAndStoreToken(HttpContext context)
        {
            context.Response.Cookies.Delete("CSRF-TOKEN");
            context.Response.Cookies.Delete("CSRF-REQUEST-TOKEN");
            var token = _antiforgery.GetAndStoreTokens(context);
            context.Response.Cookies.Append("CSRF-REQUEST-TOKEN", token.RequestToken, new CookieOptions { HttpOnly = false });
        }
    }
}