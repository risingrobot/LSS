using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("itemimage")]
    public class ItemImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public long itemid { get; set; }

        public byte[] image { get; set; }

        public string imagetype { get; set; }
    }
}