using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("shopimage")]
    public class ShopImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public long shopId { get; set; }

        public byte[] shopImage { get; set; }

        public int imageType { get; set; }
    }
}