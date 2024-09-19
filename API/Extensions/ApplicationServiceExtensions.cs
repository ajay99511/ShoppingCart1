using System.Text;
using API.Data;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API.Extensions;
    public static class ApplicationServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c=>{
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    Description =" Get you bearer with tokenkey here",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme,
                    },
                };
                 c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
                 c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                        jwtSecurityScheme,
                        Array.Empty<string>()
                    }
                 });
            });
            services.AddHttpContextAccessor();
            services.AddControllers();
            services.AddCors();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IProductRepository,ProductRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IBasketRepository,BasketRepository>();
            services.AddScoped<IOrderRepository,OrderRepository>();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddScoped<TokenService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt=>{
                opt.TokenValidationParameters = new TokenValidationParameters{
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWTSettings:TokenKey"])),
                };
            })
            ;
            services.AddAuthorization();
            services.AddDbContext<StoreContext>(opt=>
            {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            }); 
            services.AddIdentityCore<User>(opt=>
            opt.User.RequireUniqueEmail = true
            )
            .AddRoles<Role>()
            .AddEntityFrameworkStores<StoreContext>();
        }
    }