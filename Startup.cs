using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Blog.Models;
using Blog.Models.Identity;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using System.Net;
using System.Threading.Tasks;
using System;
using Blog.Security;
using Security;
using System.Linq;
using Microsoft.Extensions.Logging;
using Ganss.XSS;

namespace Blog
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options =>
                {
                    var settings = options.SerializerSettings;
                    settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddDbContext<AppIdentityDbContext>(options => options.UseMySql(_configuration["ConnectionStrings:BlogDatabase"]));
            services
                .AddIdentity<BlogIdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<AppIdentityDbContext>()
                .AddDefaultTokenProviders();
            services.AddAuthentication();
            services.AddAntiforgery(options =>
            {
                options.Cookie.Name = "CSRF-TOKEN";
                options.HeaderName = "X-CSRF-TOKEN";
            });
            services.ConfigureApplicationCookie(options =>
            {
                options.Events = new CookieAuthenticationEvents
                {
                    // If the framework tries to redirect, override and send 401.
                    OnRedirectToLogin = ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api"))
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        return Task.FromResult(0);
                    }
                };
                // options.Cookie.Expiration = TimeSpan.FromDays(365);
                options.Cookie.MaxAge = TimeSpan.FromDays(365);
            });
            services.AddDbContext<BlogContext>(options =>
            {
                options.UseMySql(_configuration["ConnectionStrings:BlogDatabase"]);
                if (_environment.IsDevelopment())
                {
                    options.EnableSensitiveDataLogging(true);
                }
            });
            services.AddAuthorization(options => options.AddPolicy("authorPolicy", policy => policy.RequireClaim("userType", "author")));
            services.AddDataProtection();

            services.AddSingleton<PurposeStringConstants>();
            services.AddSingleton<HtmlSanitizer>(new HtmlSanitizer());
            services.AddSingleton<IXsrfService, XsrfService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseHsts(hsts => hsts.MaxAge(days: 365));
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseSpaStaticFiles();
            app.UseCors(cors => cors.SetIsOriginAllowed(origin => origin == "https://localhost:6001"));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            //app.UseStaticFiles();

            app.UseWhen(
                context => !context.Request.Path.StartsWithSegments("/api"),
                appBuilder =>
                {
                    appBuilder.UseXfo(xfo => xfo.Deny());
                    appBuilder.UseCsp(options => options
                        .DefaultSources(s => s.Self())
                        .ReportUris(r => r.Uris("/csp/violations")));
                }
            );

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
