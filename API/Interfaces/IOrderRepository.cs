using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        public void AddOrder(Order order);
        public void DeleteOrder (Order order);
        public Task<OrderDto> GetOrder(string username, int orderId);
        public Task<List<OrderDto>> GetOrders(string username);
        public Task<Order> CreateOrder (Basket basket,string username,ShippingAddress shippingAddress);
    }
}