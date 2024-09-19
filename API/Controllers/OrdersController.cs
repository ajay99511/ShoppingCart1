using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrdersController(IUnitOfWork unitOfWork) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrdersAsync()
        {
            var username = User.Identity.Name;
            return await unitOfWork.OrderRepository.GetOrders( username );
        }

        [HttpGet("{id}",Name ="GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int orderId)
        {
            return await unitOfWork.OrderRepository.GetOrder(User.Identity.Name, orderId);
        }
        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await unitOfWork.BasketRepository.retrieveBasket(User.Identity.Name);
            if (basket == null) return BadRequest(new ProblemDetails{Title = "Basket Not found"});
           var order = await unitOfWork.OrderRepository.CreateOrder(basket,User.Identity.Name,orderDto.shippingAddress);
            unitOfWork.OrderRepository.AddOrder(order);
            unitOfWork.BasketRepository.DeleteBasket(basket);
            if(orderDto.saveAddress)
            {
                var user = await unitOfWork.UserRepository.GetUserByUsername(User.Identity.Name);
                var address = new UserAddress
                {
                    FullName = orderDto.shippingAddress.FullName,
                    Address1 = orderDto.shippingAddress.Address1,
                    Address2 = orderDto.shippingAddress.Address2,
                    City = orderDto.shippingAddress.City,
                    State = orderDto.shippingAddress.State,
                    ZipCode = orderDto.shippingAddress.ZipCode,
                    Country=orderDto.shippingAddress.Country,
                };
                user.userAddress = address;
                unitOfWork.UserRepository.UpdateUser(user);
            }
            var result = await unitOfWork.complete();
            if(result)
            {
                return CreatedAtAction("GetOrder",new {id = order.Id},order.Id);
            }
            return BadRequest("Problem while ordering");
        }
    }
}
        
    //     [HttpPost]
    //     public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
    //     {
    //         var basket = await unitOfWork.BasketRepository.retrieveBasket(User.Identity.Name);
    //         if (basket == null) return BadRequest(new ProblemDetails{Title = "Basket Not found"});
    //         var items = new List<OrderItem>();
    //         foreach(var item in basket.Items)
    //         {
    //             var productItem = await unitOfWork.ProductRepository.GetProductById(item.ProductId);
    //             var productOrdered = new ProductItemOrdered{
    //                 ProductId = productItem.Id,
    //                 Name = productItem.Name,
    //                 PhotoUrl = productItem.PictureUrl
    //             };
    //             var OrderItem = new OrderItem
    //             {
    //                 ItemOrdered = productOrdered,
    //                 Price = productItem.Price,
    //                 Quantity= item.Quantity,
    //             };
    //             items.Add(OrderItem);
    //             productItem.QuantityInStock -= item.Quantity; 
    //         }
    //         var subtotal = items.Sum(x=>x.Price);
    //         var DeliveryFee = subtotal>1000 ? 0:500;
    //         var order = new Order{
    //             BuyerId = User.Identity.Name,
    //             shippingAddress = orderDto.shippingAddress,
    //             orderItems = items,
    //             SubTotal = subtotal,
    //             DeliveryFee = DeliveryFee,
    //         };
    //         unitOfWork.OrderRepository.AddOrder(order);
    //         unitOfWork.BasketRepository.DeleteBasket(basket);
    //         if(orderDto.saveAddress)
    //         {
    //             var user = await unitOfWork.UserRepository.GetUserByUsername(User.Identity.Name);
    //             user.userAddress = new UserAddress
    //             {
    //                 FullName = orderDto.shippingAddress.FullName,
    //                 Address1 = orderDto.shippingAddress.Address1,
    //                 Address2 = orderDto.shippingAddress.Address2,
    //                 City = orderDto.shippingAddress.City,
    //                 State = orderDto.shippingAddress.State,
    //                 ZipCode = orderDto.shippingAddress.ZipCode,
    //                 Country=orderDto.shippingAddress.Country,
    //             };
    //             unitOfWork.UserRepository.UpdateUser(user);
    //         }
    //         var result = await unitOfWork.complete();
    //         if(result)
    //         {
    //             return CreatedAtAction("GetOrder",new {id = order.Id},order.Id);
    //         }
    //         return BadRequest("Problem while ordering");
    //     }
    // 