using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace API.Controllers
{
    public class BasketController: BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();
            var basketDto = ConvertBasketDto(basket);
            return basketDto;
        }


        
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetriveBasket();
            if(basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();
            basket.AddItem(product,quantity);
            var result = await _context.SaveChangesAsync()>0;
            if(result) return CreatedAtRoute("GetBasket",ConvertBasketDto(basket));
            return BadRequest(new ProblemDetails{Title="Problem Ocurred while Saving Changes"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetriveBasket();
            if(basket == null) return BadRequest(new ProblemDetails{Title="Basket Not Found"});
            basket.RemoveItem(productId,quantity);
            var result = await _context.SaveChangesAsync()>0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails{Title="Error While Saving Chnages"});
        }

        

        //Private Method Calls

        private BasketDto ConvertBasketDto(Basket basket)
        {
            var basketDto = new BasketDto{
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(x=> new BasketItemDto{
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    PictureUrl = x.Product.PictureUrl,
                    Brand = x.Product.Brand,
                    Type = x.Product.Type,
                    Quantity = x.Quantity,
                }).ToList()
            };
            return basketDto;
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                        .Include(x => x.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket = new Basket
            {
                BuyerId =buyerId,
            };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}

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