using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Data.Entities;

namespace UpHotel.Data.Repositories.Contracts
{
    public interface IReservationRepository 
    {
        Task AddReservationAsync(RoomReservation reservation);
        Task SaveChangesAsync();
        Task<RoomReservation> GetReservationAsync(int reservationId);
        Task<ICollection<RoomReservation>> GetReservationsAsync(bool includeInactive = true);
    }
}
