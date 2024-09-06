using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;
    public static class ApplicationServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddControllers();
            services.AddCors();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IProductRepository,ProductRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddAuthorization();
            services.AddAuthentication();
            services.AddDbContext<StoreContext>(opt=>
            {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            }); 
            services.AddIdentityCore<User>(opt=>
            opt.User.RequireUniqueEmail = true
            )
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<StoreContext>();
        }
    }