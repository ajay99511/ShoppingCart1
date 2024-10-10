using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IBasketRepository
    {
        public void AddBasket(Basket basket);
        public void DeleteBasket(Basket basket);
        public BasketDto ConvertBasketDto(Basket basket);
         public Task<Basket> retrieveBasket(string buyerId);
         public string getBuyerId();
         
        //  public Basket CreateBasket();
    }
}