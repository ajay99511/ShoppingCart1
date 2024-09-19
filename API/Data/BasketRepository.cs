using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

public class BasketRepository(StoreContext context,IHttpContextAccessor httpContextAccessor) : IBasketRepository
{
    public void AddBasket(Basket basket)
    {
        context.Baskets.Add( basket );
    }
    public void DeleteBasket(Basket basket)
    {
        context.Baskets.Remove( basket ); 
    }
    public BasketDto ConvertBasketDto(Basket basket)
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
        public Task<Basket> retrieveBasket(string buyerId)
        {
            var basket = context.Baskets
                        .Include(x => x.Items)
                        .ThenInclude(p => p.Product)
                        .Where(x => x.BuyerId == buyerId)
                        .FirstOrDefaultAsync();
            return basket;
        }
        // public Basket CreateBasket()
        // {
        //     var buyerId = httpContextAccessor.HttpContext.User.Identity.Name;
        //     if(string.IsNullOrEmpty(buyerId))
        //     {
        //         buyerId = Guid.NewGuid().ToString();
        //         var cookieOptions = new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};
        //         httpContextAccessor.HttpContext.Response.Cookies.Append("buyerId",buyerId,cookieOptions);
        //     }
        //     var basket = new Basket
        //     {
        //         BuyerId =buyerId,
        //     };
        //     // _context.Baskets.Add(basket);
        //     context.Baskets.Add(basket);
        //     return basket;
        // }
        public string getBuyerId()
        {
            return httpContextAccessor.HttpContext.User.Identity.Name ?? 
            httpContextAccessor.HttpContext.Request.Cookies["buyerId"];
        }
}