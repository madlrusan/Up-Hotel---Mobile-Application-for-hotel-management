using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UpHotel.Business.Commands;
using UpHotel.Business.Contracts;

namespace UpHotel.API.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Housekeeping")]
        public async Task<IActionResult> GetRoomsStatus()
        {
            return Ok(await _roomService.GetRoomsStatus());
        }

        [HttpGet("{roomId}")]
        [Authorize]
        public async Task<IActionResult> GetRoomsStatus(int roomId)
        {
            var room = await _roomService.GetRoomStatus(roomId);

            if (room is null) return NotFound();

            return Ok(room);
        }

        [HttpPut("status")]
        [Authorize(Roles = "Admin,Housekeeping")]
        public async Task<IActionResult> UpdateRoomStatus(UpdateRoomStatusCommand cmd)
        {
            await _roomService.UpdateRoomStatus(cmd);
            return Ok();
        }
    }
}
