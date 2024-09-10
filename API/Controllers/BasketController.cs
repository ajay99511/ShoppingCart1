using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace API.Controllers
{
    public class BasketController(IUnitOfWork unitOfWork): BaseApiController
    {
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var buyerId = unitOfWork.BasketRepository.getBuyerId();
            // var buyerId = getBuyerId();
            var basket = await RetriveBasket(buyerId);
            if (basket == null) return NotFound();
            var basketDto = unitOfWork.BasketRepository.ConvertBasketDto(basket);
            return basketDto;
        }
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            // var buyerId = getBuyerId();
            var buyerId = unitOfWork.BasketRepository.getBuyerId();
            var basket = await RetriveBasket(buyerId);
            if(basket == null) basket = CreateBasket();
            var product = await unitOfWork.ProductRepository.GetProductById(productId);
            if(product == null) return BadRequest(new ProblemDetails{Title="Product Not Found"});
            basket.AddItem(product,quantity);
            var result = await unitOfWork.complete();
            if(result) return CreatedAtRoute("GetBasket",unitOfWork.BasketRepository.ConvertBasketDto(basket));
            return BadRequest(new ProblemDetails{Title="Problem Ocurred while Saving Changes"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // var buyerId = getBuyerId();
            var buyerId = unitOfWork.BasketRepository.getBuyerId();
            var basket = await RetriveBasket(buyerId);
            if(basket == null) return BadRequest(new ProblemDetails{Title="Basket Not Found"});
            basket.RemoveItem(productId,quantity);
            // var result = await _context.SaveChangesAsync()>0;
            var result = await unitOfWork.complete();
            if (result) return Ok();
            return BadRequest(new ProblemDetails{Title="Error While Saving Chnages"});
        }      

        private async Task<Basket> RetriveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId)) 
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await unitOfWork.BasketRepository.retrieveBasket(buyerId);
            // .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
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

// private string getBuyerId()
        //  {
        //     return User.Identity.Name ?? Request.Cookies["buyerId"];
        //  }

        
// return new BasketDto
//             {
//                 Id = basket.Id,
//                 BuyerId = basket.BuyerId,
//                 Items = basket.Items.Select(x=> new BasketItemDto{
//                     ProductId = x.ProductId,
//                     Name = x.Product.Name,
//                     Price = x.Product.Price,
//                     PictureUrl = x.Product.PictureUrl,
//                     Brand = x.Product.Brand,
//                     Type = x.Product.Type,
//                     Quantity = x.Quantity,
//                 }).ToList()
//             };


// private readonly StoreContext _context;
        // public BasketController(StoreContext context)
        // {
        //     _context = context;
        // }
         