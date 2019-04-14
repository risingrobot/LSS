using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("ShopType")]
    public class ShopType
    {
        [key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public string typeName { get; set; }

    }
    [Table("Shop_Types")]
    public class Shop_Types
    {
        [key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { set; get; }
        public long shopId { set; get; }
        public long shopTypetId { set; get; }
    }
}