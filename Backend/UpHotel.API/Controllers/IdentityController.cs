using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UpHotel.Business.Contracts;
using UpHotel.Business.ViewModels;

namespace UpHotel.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class IdentityController : ControllerBase
    {
        public readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var token = await _identityService.Login(model);
            return Ok(new { Token = token });
        }

        [HttpPost("user")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddOrUpdateUser(AddOrUpdateUserViewModel model)
        {
            await _identityService.AddOrUpdateUser(model);
            return Ok();
        }

        [HttpGet("staff")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetStaffMembers()
        {
            return Ok(await _identityService.GetStaffUsers());
        }
    }
}
