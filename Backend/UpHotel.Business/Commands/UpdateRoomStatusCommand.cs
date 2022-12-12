
using UpHotel.Data.Entities;

namespace UpHotel.Business.Commands
{
    public class UpdateRoomStatusCommand
    {
        public int RoomId { get; set; }
        public RoomStatus Status { get; set; }
    } 
}
