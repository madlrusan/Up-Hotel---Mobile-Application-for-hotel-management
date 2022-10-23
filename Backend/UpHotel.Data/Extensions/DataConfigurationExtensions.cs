using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using UpHotel.Data.Database;

namespace UpHotel.Data.Extensions
{
    public static class DataConfigurationExtensions
    {
        public static IServiceCollection AddDataServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("UpHotel.Data")));
            return services;
        }
    }
}
