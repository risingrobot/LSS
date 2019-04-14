using LSMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LSMVC.Content
{
    public class WorkContext: DbContext
    {
        static WorkContext context = null;
        public WorkContext(string connectionString)
       : base(connectionString)
        {
            //This line is optional but it prevents initialising the database
            //every time you connect to a new database
            Database.SetInitializer<WorkContext>(new DropCreateDatabaseIfModelChanges<WorkContext>());
            
        }

        public static WorkContext GetContext()
        {
            if (context == null)
            {
                string connection = @"Data Source=(localdb)\MSSQLLocalDB;
Initial Catalog=C:\ARSALAN\ARSALAN\CCC\LSMVC\LSMVC\APP_DATA\Database1.MDF;
Integrated Security=True;
Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;
ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
                context = new WorkContext(connection);
            }
            return context;
        }
             

        public DbSet<SHOPKEEPER> Shopkeeper { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopType> Shoptype { get; set; }
        public DbSet<Shop_Types> Shop_Types { get; set; }        
         public DbSet<ShopImage> ShopImage { get; set; }

        public DbSet<Item> ShopItem { get; set; }
        public DbSet<ItemImage> ItemImage { get; set; }

        public DbSet<ShopkeeperImage> ShopkeeperImage { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Item_Types> Item_Types { get; set; }
        public DbSet<ItemType> ItemType { get; set; }



    }

}