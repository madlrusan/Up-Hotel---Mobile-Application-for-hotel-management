using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Data.Database;
using UpHotel.Data.Entities;
using UpHotel.Data.Repositories.Contracts;

namespace UpHotel.Data.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ReservationRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddReservationAsync(RoomReservation reservation)
        {
            await _dbContext.RoomReservations.AddAsync(reservation);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<RoomReservation> GetReservationAsync(int reservationId)
            => await _dbContext.RoomReservations.FirstOrDefaultAsync(p => p.Id == reservationId);

        public async Task<ICollection<RoomReservation>> GetReservationsAsync(bool skipInactive = true)
        {
            var query = _dbContext.RoomReservations.Include(p => p.Room).AsQueryable();

            if (skipInactive)
                query = query.Where(p => p.IsActive);

            return await query.ToListAsync();
        }

        public async Task SaveChangesAsync()
             => await _dbContext.SaveChangesAsync();
    }
}
