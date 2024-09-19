using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query.Select
            (order =>new OrderDto{
                Id = order.Id,
                BuyerId = order.BuyerId,
                shippingAddress = order.shippingAddress,
                OrderDate = order.OrderDate,
                DeliveryFee = order.DeliveryFee,
                SubTotal = order.SubTotal,
                orderStatus = order.orderStatus,
                Total = order.GetTotal(),
                orderItems = order.orderItems.
                Select(
                    item=>new OrderItemDto{
                        ProductId = item.ItemOrdered.ProductId,
                        Price = item.Price,
                        Name = item.ItemOrdered.Name,
                        PictureUrl = item.ItemOrdered.PhotoUrl,
                        Quantity = item.Quantity,
                    }
                ).ToList()
            }).AsNoTracking();
        }

        public static IQueryable<BasketDto> convertToBasketDto(this IQueryable<Basket> query)
        {
            return query.Select(basket =>new BasketDto{
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
            });
        }
    }
}