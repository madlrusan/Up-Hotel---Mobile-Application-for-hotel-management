using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UpHotel.Business.Commands;
using UpHotel.Business.Contracts;

namespace UpHotel.API.Controllers
{
    [ApiController]
    [Route("api/reservations")]
    [Authorize(Roles = "Admin,Reception")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(CheckInCommand cmd)
        {
            await _reservationService.CheckIn(cmd);
            return Ok();
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut(CheckoutCommand cmd)
        {
            await _reservationService.CheckOut(cmd);
            return Ok();
        }

        //[HttpGet]
        //public async Task<IActionResult> GetReservations(bool includeInactive = false)
        //{
        //    return Ok(await _reservationService.GetReservations(includeInactive));
        //} 
    }
}
