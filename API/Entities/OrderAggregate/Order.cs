using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    public class Order
    {
        public int Id { get; set; } 
        public string BuyerId { get; set; }
        [Required]
        public ShippingAddress shippingAddress{ get; set; }
        public DateTime OrderDate { get; set; }= DateTime.Now;
        public List<OrderItem> orderItems{ get; set; }
        public long SubTotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus orderStatus{ get; set; } = OrderStatus.pending;

        public long GetTotal()
        {
            return SubTotal + DeliveryFee;
        }
    }                                                                                                                                                                                      
}