using System.Threading.Tasks;
using DatingAppApi.Data;
using DatingAppApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController :ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            this._repo = repo;

        } 
        [HttpPost("register")] 
        public async Task<IActionResult> Register(string username, string password){
            //validate request 
            username = username.ToLower(); 
            if(await _repo.UserExist(username)) 
            return BadRequest("Username alredy exist"); 

            var userToCreate = new User{
                Username = username
            };  
            var createdUser = await _repo.Register(userToCreate, password);
            return StatusCode(201);
        }
    }
}