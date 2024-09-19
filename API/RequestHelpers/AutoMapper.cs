using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using AutoMapper;

namespace API.Extensions
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<User,UserDto>();
            CreateMap<Basket,BasketDto>();
            CreateMap<Order,OrderDto>()
            .ForMember(s=>s.orderItems,o=>o.MapFrom(d=>d.orderItems));
            // .ForMember(s=>s.orderStatus,o=>o.MapFrom(d=>d.orderStatus.ToString()));
            CreateMap<OrderItem,OrderItemDto>()
            .ForMember(s=>s.ProductId,o=>o.MapFrom(d=>d.ItemOrdered.ProductId))
            .ForMember(s=>s.PictureUrl,o=>o.MapFrom(d=>d.ItemOrdered.PhotoUrl))
            .ForMember(s=>s.Name,o=>o.MapFrom(d=>d.ItemOrdered.Name));
        }
    }
}