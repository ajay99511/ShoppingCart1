using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderItemDto
    {
        public int ProductId { get; set;}
        public string Name { get; set;}
        public string PictureUrl { get; set;}
        public long Price { get; set;}
        public int Quantity { get; set;}

    }
}