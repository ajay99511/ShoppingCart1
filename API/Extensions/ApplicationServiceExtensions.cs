using API.Data;
using API.Interfaces;
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
            services.AddScoped<IProductRepository,ProductRepository>();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddDbContext<StoreContext>(opt=>
            {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
        }
    }