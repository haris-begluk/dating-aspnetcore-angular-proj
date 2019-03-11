using System.Collections.Generic;
using System.Linq;
using DatingAppApi.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingAppApi.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;

        public Seed(UserManager<User> userManager)
        {
            this._userManager = userManager;

        }
        public void SeedUsers()
        {
            if (!_userManager.Users.Any())
            {


                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    _userManager.CreateAsync(user, "password").Wait();
                }


            }
        }


    }
}