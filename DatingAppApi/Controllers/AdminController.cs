using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]
        public IActionResult GetUsersWithRoles()
        {
            return Ok("Only admins can see this page!");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModerators")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can se this");
        }
    }
}