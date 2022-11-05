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

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var token = await _identityService.Login(model);
            return Ok(new { Token = token });
        }
    }
}
