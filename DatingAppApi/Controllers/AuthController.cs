using System.Threading.Tasks;
using DatingAppApi.Data;
using DatingAppApi.Dtos;
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
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto){
            //validate request 
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower(); 
            if(await _repo.UserExist(userForRegisterDto.Username)) 
            return BadRequest("Username alredy exist"); 

            var userToCreate = new User{
                Username = userForRegisterDto.Username
            };  
            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }
    }
}