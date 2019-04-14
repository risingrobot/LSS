using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("shop")]
    public class Shop
    { 
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public long No { get; set; }
        public string Name { get; set; }
        public int Location { get; set; }
        public string Area { get; set; }
        public DateTime RegisteredDate { get; set; }
        public bool Status { get; set; }
        public long owner { get; set; }

    }
  
}