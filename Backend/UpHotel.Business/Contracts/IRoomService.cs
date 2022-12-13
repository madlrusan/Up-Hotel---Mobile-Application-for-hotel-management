using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Business.Commands;
using UpHotel.Business.ViewModels;
using UpHotel.Data.Entities;

namespace UpHotel.Business.Contracts
{
    public interface IRoomService
    {
        Task<RoomViewModel> GetRoomStatus(int roomId);
        Task<List<RoomViewModel>> GetRoomsStatus();
        Task UpdateRoomStatus(UpdateRoomStatusCommand cmd);
    }
}
