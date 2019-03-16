using DatingAppApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        public AdminController(DataContext context)
        {
            this._context = context;

        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();
            return Ok(userList);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModerators")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can se this");
        }
    }
}