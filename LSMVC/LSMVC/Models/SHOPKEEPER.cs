using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LSMVC.Models
{
    [Table("shopkeeper")]
    public class SHOPKEEPER
    {       
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string email { get; set; }
        public string fullName { get; set; }
        public DateTime dateofBirth { get; set; }
        public Int64 PhoneNum { get; set; }
        public string password { get; set; }
        public int userType { get; set; }
        public int Gender { get; set; }
        public int status { get; set; }
    }   
}