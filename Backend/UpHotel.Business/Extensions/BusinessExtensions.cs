
using Microsoft.Extensions.DependencyInjection;
using UpHotel.Data.Extensions;

namespace UpHotel.Business.Extensions
{
    public static class BusinessExtensions
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services, string connectionString)
        {
            services.AddDataServices(connectionString);
            return services;
        }
    }
}
