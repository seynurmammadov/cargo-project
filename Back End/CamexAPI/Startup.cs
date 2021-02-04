using Business.Abstract;
using Business.Concrete;
using CamexAPI.Identity;
using CamexAPI.Infrastructure;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entity.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CamexAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MyIdentityDbContext>(options =>
            {
                options.UseSqlServer(Configuration["ConnectionStrings:Default"]);
            });

            services.AddScoped<IPrivateCustomerService, PrivateCustomerManager>();
            services.AddScoped<IPrivateCustomerDAL, EFPrivateCustomer>();
            services.AddScoped<ICitizenshipService, CitizenshipManager>();
            services.AddScoped<ICitizenshipDAL, EFCitizenship>();
            services.AddScoped<ICityService, CityManager>();
            services.AddScoped<ICityDAL, EFCity>();
            services.AddScoped<IOfficeService, OfficeManager>();
            services.AddScoped<IOfficeDAL, EFOffice>();
            services.AddScoped<IBalanceService, BalanceManager>();
            services.AddScoped<IBalanceDAL, EFBalance>();
            services.AddScoped<IBusinessCustomerService, BusinessCustomerManager>();
            services.AddScoped<IBusinessCustomerDAL, EFBusinessCustomer>();
            services.AddScoped<ILanguageService, LanguageManager>();
            services.AddScoped<ILanguageDAL, EFLanguage>();
            services.AddScoped<ICountryService, CountryManager>();
            services.AddScoped<ICountryDAL, EFCountry>();
            services.AddScoped<ICountryAddressDescriptionService, CountryAddressDescriptionManager>();
            services.AddScoped<ICountryAddressDescriptionDAL, EFCountryAddressDescription>();
            services.AddScoped<IOfficeNameTranslateService, OfficeNameTranslateManager>();
            services.AddScoped<IOfficeNameTranslateDAL, EFOfficeNameTranslate>();
            services.AddScoped<ICityNameTranslateService, CityNameTranslateManager>();
            services.AddScoped<ICityNameTranslateDAL, EFCityNameTranslate>();
            services.AddScoped<IProductService, ProductManager>();
            services.AddScoped<IProductDAL, EFProduct>();
            services.AddScoped<IProductTranslateService, ProductTranslateManager>();
            services.AddScoped<IProductTranslateDAL, EFProductTranslate>();
            services.AddScoped<INoticeTranslateService, NoticeTranslateManager>();
            services.AddScoped<INoticeTranslateDAL, EFNoticeTranslate>();
            services.AddScoped<IStatusService, StatusManager>();
            services.AddScoped<IStatusDAL, EFStatus>();
            services.AddScoped<ICargoService, CargoManager>();
            services.AddScoped<ICargoDAL, EFCargo>();
            services.AddScoped<IOrderService, OrderManager>();
            services.AddScoped<IOrderDAL, EFOrder>();
            services.AddScoped<IShopService, ShopManager>();
            services.AddScoped<IShopDAL, EFShop>();
            services.AddScoped<IShopLinkService, ShopLinkManager>();
            services.AddScoped<IShopLinkDAL, EFShopLink>();
            // For Identity  
            services.AddIdentity<AppUser, IdentityRole>(IdentityOption =>
            {
                IdentityOption.Password.RequiredLength = 8;
                IdentityOption.Password.RequireDigit = true;
                IdentityOption.Password.RequireUppercase = false;
                IdentityOption.Password.RequireLowercase = true;
                IdentityOption.Password.RequireNonAlphanumeric = false;

                IdentityOption.User.RequireUniqueEmail = true;

                IdentityOption.Lockout.MaxFailedAccessAttempts = 5;
                IdentityOption.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(60);
                IdentityOption.Lockout.AllowedForNewUsers = true;
            }).AddEntityFrameworkStores<MyIdentityDbContext>().AddDefaultTokenProviders();


            var jwtTokenConfig = Configuration.GetSection("jwtTokenConfig").Get<JwtTokenConfig>();
            services.AddSingleton(jwtTokenConfig);

            // Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtTokenConfig.Issuer,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtTokenConfig.Secret)),
                    ValidAudience = jwtTokenConfig.Audience,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(1)
                };
            });
            services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddSingleton<IJwtAuthManager, JwtAuthManager>();
            services.AddHostedService<JwtRefreshTokenCache>();

            services.AddCors();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(
                options => options.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()
            );
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=auth}/{action=Index}/{id?}");
            });
        }
    }
}
