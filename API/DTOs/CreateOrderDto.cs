using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class CreateOrderDto
    {
        public bool saveAddress { get; set; }
        public ShippingAddress shippingAddress{ get; set; }
    }
}