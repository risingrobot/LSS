using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("Shopitem")]
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public int shopId { get; set; }

        public string itemName { get; set; }
        
        public double itemPrice { get; set; }

        public string itemDetails { get; set; }
        public int itemAvailablity { get; set; }

    }
}