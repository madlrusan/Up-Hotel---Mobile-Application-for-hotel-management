using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using UpHotel.Data.Database;
using UpHotel.Data.Entities;
using UpHotel.Data.Repositories;
using UpHotel.Data.Repositories.Contracts;

namespace UpHotel.Data.Extensions
{
    public static class DataConfigurationExtensions
    {
        public static IServiceCollection AddDataServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("UpHotel.Data")));
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddRoleManager<RoleManager<IdentityRole>>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            return services;
        }
    }
}
