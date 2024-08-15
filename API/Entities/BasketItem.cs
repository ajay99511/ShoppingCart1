using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("BasketItem")]
    public class BasketItem
    {
        public int Id { get; set;}
        public int Quantity { get; set;}

        //Navigation Properties to keep track of the items and quantity
        public int ProductId{ get; set;}
        public Product Product{ get; set;}

        public int BasketId { get; set;}
        public Basket Basket{ get; set;}
    }
}