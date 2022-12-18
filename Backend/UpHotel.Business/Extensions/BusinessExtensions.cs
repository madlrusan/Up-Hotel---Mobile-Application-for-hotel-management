
using Microsoft.Extensions.DependencyInjection;
using UpHotel.Business.Contracts;
using UpHotel.Business.Services;
using UpHotel.Data.Extensions;

namespace UpHotel.Business.Extensions
{
    public static class BusinessExtensions
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services, string connectionString)
        {
            services.AddDataServices(connectionString);
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IRoomService, RoomService>();
            services.AddScoped<IReservationService, ReservationService>();
            return services;
        }
    }
}
