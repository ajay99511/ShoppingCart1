using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
using Microsoft.EntityFrameworkCore;
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
               userBasket.BuyerId = user.UserName;
            }
            if(anonBasket != null)
            {
                if(userBasket != null)
                {
                    unitOfWork.BasketRepository.DeleteBasket(userBasket);
                    // Response.Cookies.Delete("buyerId");
                    // await unitOfWork.complete();
                }
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
            }
            await unitOfWork.complete();
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
            // if(Basket == null)
            // {
            // Basket = Create(username);
            // await unitOfWork.complete();
            // }
            return new UserDto{
                Email = user.Email,
                Username = username,
                Token = await tokenService.CreateToken(user),
                basket = Basket!=null?unitOfWork.BasketRepository.ConvertBasketDto(Basket):null,
            };

        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await userManager.Users
            .Where(u=>u.UserName == User.Identity.Name)
            .Select(u=>u.userAddress)
            .FirstOrDefaultAsync();
        }
        
        private Basket CreateBasket()
        {
            string buyerId = User.Identity.Name;
            // var buyerId = User.Identity.Name;
            if(string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};
                Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            }
            Basket basket = new Basket
            {
                BuyerId =buyerId,
            };
            // _context.Baskets.Add(basket);
            unitOfWork.BasketRepository.AddBasket(basket);
            return basket;
        }


        // [HttpPost("registerProducts")]
        // public async Task<ActionResult> RegisterProducts()
        // {
        //     var ProductData = await System.IO.File.ReadAllTextAsync("Data/JsonData/productData.json");
        //     var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};
        //     var products = JsonSerializer.Deserialize<List<Product>>(ProductData,options);
        //     foreach (var product in products)
        //     {
        //     unitOfWork.ProductRepository.AddProduct(product);
        //     }
        //     await unitOfWork.complete();
        //     return Ok(products);
        // }
    }
}






//         public class StringToDecimalConverter : JsonConverter<decimal>
// {
//     public override decimal Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
//     {
//         if (reader.TokenType == JsonTokenType.String && decimal.TryParse(reader.GetString(), out var value))
//         {
//             return value;
//         }
//         return reader.GetDecimal();
//     }

//     public override void Write(Utf8JsonWriter writer, decimal value, JsonSerializerOptions options)
//     {
//         writer.WriteNumberValue(value);
//     }
// }
// var options = new JsonSerializerOptions
// {
//     Converters =
//     {
//         new StringToDecimalConverter()
//     }
// };

// var result = JsonSerializer.Deserialize<List<YourModel>>(jsonString, options);
