using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
    public class AccountController(UserManager<User> userManager ) : BaseApiController
    {
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.Username);
            if(user == null || !await userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }
            return new UserDto 
            {
                Username = user.UserName,
                Email = user.Email
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
             var user = new User{UserName=registerDto.Username, Email=registerDto.Email};
             var result = await userManager.CreateAsync(user,registerDto.Password);
             if(!result.Succeeded)
             {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code,error.Description);
                }
                return ValidationProblem();
             }
             await userManager.AddToRoleAsync(user,"Member");
             return StatusCode(201);
        }
        
    }
}