using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("ItemType")]
    public class ItemType
    {
        [key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public string typeName { get; set; }
    }
    [Table("Item_Types")]
    public class Item_Types
    {
        [key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { set; get; }
        public long itemId { set; get; }
        public long itemtypeId { set; get; }
    }
}