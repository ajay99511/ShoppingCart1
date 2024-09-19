using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; } 
        public string BuyerId { get; set; }
        public ShippingAddress shippingAddress{ get; set; }
        public DateTime OrderDate { get; set; }= DateTime.Now;
        public List<OrderItemDto> orderItems{ get; set; }
        public long SubTotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus orderStatus{ get; set; }
        public long Total { get; set; }

    }
//    public string  orderStatus{ get; set; } => convert order.orderStatus.tostring
}