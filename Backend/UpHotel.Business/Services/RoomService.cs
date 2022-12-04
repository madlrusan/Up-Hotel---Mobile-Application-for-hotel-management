using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Business.Contracts;
using UpHotel.Business.Exceptions;
using UpHotel.Business.ViewModels;
using UpHotel.Data.Entities;
using UpHotel.Data.Repositories.Contracts;

namespace UpHotel.Business.Services
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepo;

        public RoomService(IRoomRepository roomRepo)
        {
            _roomRepo = roomRepo;
        }

        public async Task<List<RoomViewModel>> GetRoomsStatus()
        {
            return (await _roomRepo.GetRoomsAsync()).Select(r => MapToViewModel(r)).ToList();
        }

        public async Task<RoomViewModel> GetRoomStatus(int roomId)
        {
            if (roomId <= 0) throw new ValidationException("Invalid room id!");

            var room = await _roomRepo.GetRoomAsync(roomId);

            if (room is null) return null;

            return MapToViewModel(room);
        }

        private RoomViewModel MapToViewModel(Room room)
        {
            return new RoomViewModel() { Id = room.Id, Name = room.Name , Status = room.RoomStatus};
        }
    }
}
