

using Microsoft.EntityFrameworkCore;
using UpHotel.Data.Database;
using UpHotel.Data.Entities;
using UpHotel.Data.Repositories.Contracts;

namespace UpHotel.Data.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        public readonly ApplicationDbContext _dbContext;

        public RoomRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Room> GetRoomAsync(int id)
        {
            return await _dbContext.Rooms.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Room>> GetRoomsAsync()
        {
           return await _dbContext.Rooms.ToListAsync();
        }
    }
}
