using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
    public class AccountController(UserManager<User> userManager, 
    TokenService tokenService ,IUnitOfWork unitOfWork) : BaseApiController
    {
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.Username);
            if(user == null || !await userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }
            var userBasket = await unitOfWork.BasketRepository.retrieveBasket(loginDto.Username);
            var anonBasket = await unitOfWork.BasketRepository.retrieveBasket(Request.Cookies["buyerId"]);
            if(userBasket == null && anonBasket == null)
            {
                userBasket = CreateBasket();
            }
            if(anonBasket != null)
            {
                if(userBasket != null)
                {
                    unitOfWork.BasketRepository.DeleteBasket(userBasket);
                    anonBasket.BuyerId = user.UserName;
                    Response.Cookies.Delete("buyerId");
                    await unitOfWork.complete();
                }
            }
            var token = await tokenService.CreateToken(user);
            return new UserDto 
            {
                Username = user.UserName,
                Email = user.Email,
                Token = token,
                basket = anonBasket != null ? unitOfWork.BasketRepository.ConvertBasketDto(anonBasket) : 
                unitOfWork.BasketRepository.ConvertBasketDto(userBasket),
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

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var username = User.Identity.Name;
            var user = await userManager.FindByNameAsync(username);
            var Basket = await unitOfWork.BasketRepository.retrieveBasket(username);
            return new UserDto{
                Email = user.Email,
                Username = username,
                Token = await tokenService.CreateToken(user),
                basket =Basket!=null?unitOfWork.BasketRepository.ConvertBasketDto(Basket):null
            };

        }
        
        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if(string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};
                Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            }
            var basket = new Basket
            {
                BuyerId =buyerId,
            };
            // _context.Baskets.Add(basket);
            unitOfWork.BasketRepository.AddBasket(basket);
            return basket;
        }
    }
}