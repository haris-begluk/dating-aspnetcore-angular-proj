using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingAppApi.Data;
using DatingAppApi.Dtos;
using DatingAppApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingAppApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public AuthController(IConfiguration config, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _config = config;


        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {


            var userToCreate = _mapper.Map<User>(userForRegisterDto);
            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);
            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { controller = "Users", id = userToCreate.Id }, userToReturn);
            }
            return BadRequest(result.Errors);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            // throw new Exception("Computer sad no!");
            //Checking is user stored in database
            var user = await _userManager.FindByNameAsync(userForLoginDto.Username);
            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);
            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(u => u.NormalizedUserName == userForLoginDto.Username.ToUpper());
                var userToReturn = _mapper.Map<UserForListDto>(appUser);

                return Ok(new
                {
                    token = GenerateJwtToken(appUser),
                    user = userToReturn
                });

            }

            return Unauthorized();

        }
        private string GenerateJwtToken(User user)
        {
            //Creating claims array with two claims 
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };
            //Creating signin key 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            //Creating signin credentials-encriptyng key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Creating token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            //Creating token handler which allows us to create token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}