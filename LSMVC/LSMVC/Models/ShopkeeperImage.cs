using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("shopkeeperimage")]
    public class ShopkeeperImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public long shopKeeperId { get; set; }

        public byte [] image { get; set; }

        public string imageType { get; set; }
    }
}