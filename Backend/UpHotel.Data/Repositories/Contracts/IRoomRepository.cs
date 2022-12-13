using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Data.Entities;

namespace UpHotel.Data.Repositories.Contracts
{
    public interface IRoomRepository
    {
        Task<Room> GetRoomAsync(int id); 
        Task<List<Room>> GetRoomsAsync();
        Task SaveChangesAsync();
    }
}
