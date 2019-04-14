using LSMVC.Content;
using LSMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace LSMVC.Controllers
{
    public class UserRegisterController : Controller
    {
        WorkContext context = WorkContext.GetContext();
        readonly bool x = false;
        public UserRegisterController()
        {
            if (!x)
            {
                Adddata();
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> CreateShopKeeper(SHOPKEEPER obj, HttpPostedFileBase ImageFile)
        {
            byte[] buf = new byte[ImageFile.ContentLength];
            ShopkeeperImage shopkima = new ShopkeeperImage();
            ImageFile.InputStream.Read(buf, 0, buf.Length);
            shopkima.image = buf;

            obj.userType = 1;
            obj.status = 1;
            obj.dateofBirth = DateTime.Now;
            obj.password = EncryptClass.getpassword(obj.password);
            shopkima.shopKeeperId = obj.Id;
            context.Shopkeeper.Add(obj);
            context.ShopkeeperImage.Add(shopkima);
            await context.SaveChangesAsync();

            return RedirectToAction("Login", "Home");

        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> CreateShop(Shop item1, List<int> item3, SHOPKEEPER item2, HttpPostedFileBase ImageFileOw, HttpPostedFileBase ImageFileShop)
        {
            ShopkeeperImage shopkima = new ShopkeeperImage();
            ShopImage shopima = new ShopImage();
            byte[] buf;
            if (ImageFileOw.ContentLength > 0)
            {
                buf = new byte[ImageFileOw.ContentLength];
                ImageFileOw.InputStream.Read(buf, 0, buf.Length);
                shopkima.image = buf;
            }
            if (ImageFileShop.ContentLength > 0)
            {
                buf = new byte[ImageFileShop.ContentLength];
                ImageFileShop.InputStream.Read(buf, 0, buf.Length);
                shopima.shopImage = buf;
            }
            item1.owner = item2.Id;
            item1.RegisteredDate = DateTime.Now;
            item2.password = EncryptClass.getpassword(item2.password);
            context.Shopkeeper.Add(item2);
            context.Shops.Add(item1);
            shopima.shopId = item1.ID;
            shopkima.shopKeeperId = item2.Id;
            foreach (int itemx in item3)
            {
                var ob = new Shop_Types
                {
                    shopId = item1.ID,
                    shopTypetId = itemx
                };
                context.Shop_Types.Add(ob);
            }
            await context.SaveChangesAsync();
            return RedirectToAction("Login", "Home");
        }       
        [HttpPost]
        [AllowAnonymous]
        public ActionResult TryLogin(SHOPKEEPER model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            // EncryptClass.getpassword(model.password)
            var obj =  context.Shopkeeper
                             .Where(p => p.email == model.email && p.password == model.password)
                             .ToList();
            if (obj.Count >= 1)
            {
                SHOPKEEPER logobj = obj.FirstOrDefault();
                if (logobj.status == Acess.Enabled)
                {
                    if (logobj.userType == AcessType.ShopKeeper)
                    {
                        LoginClass lobj = new LoginClass(logobj.Id, logobj.email, Session["id"].ToString());
                        Session["Loginobj"] = lobj;
                        return View("ShopkeeperMenu");
                    }
                    else if (logobj.userType == AcessType.User)
                    {
                        LoginClass lobj = new LoginClass(logobj.Id, logobj.email, Session["id"].ToString());
                        Session["Loginobj"] = lobj;
                        return RedirectToAction("ShowShops", "ShowShops");

                    }
                }
            }
            else { return Content("Internal Error..."); }

            return View("Incorrect Entry");
        }
        [AllowAnonymous]
        public ActionResult ChooseShop()
        {
            var citynames = WorkContext.GetContext().City.Select(x => new SelectListItem() { Value = x.ID.ToString(), Text = x.cityName }).ToList();
            return PartialView(citynames);
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult ShopImage(int id)
        {
            List<ShopImage> model = WorkContext.GetContext().ShopImage.Where(x=>x.shopId == id).ToList();
            
           // return Json(model.ElementAt(0).ShopImage, JsonRequestBehavior.AllowGet);
            return File(model.FirstOrDefault().shopImage,"image/png");
        }
        

        public void Adddata()
        {
            List<string> kk = new List<string>
            {
                "Garments",
                "ElectricPhone",
                "Grocery",
                "Wood",
                "Steel"
            };
            foreach (var x in kk)
            {
                var obj = new ShopType
                {
                    typeName = x
                };
                context.Shoptype.Add(obj);
            }
            context.SaveChanges();
            foreach (var x in kk)
            {
                var obj = new ItemType
                {
                    typeName = x
                };
                context.ItemType.Add(obj);
            }
            context.SaveChanges();
            kk.Clear();
            kk.Add("Kuala Lumpur");
            kk.Add("Bahawalpur");
            foreach (var x in kk)
            {
                var obj = new City
                {
                    cityName = x,
                    countryName = "Malaysia"
                };
                context.City.Add(obj);
            }
            context.SaveChanges();
            for (int i = 0; i < 2; i++)
            {
                var obj = new SHOPKEEPER();
                if (i == 1)
                {
                    obj.email = "a";
                    obj.password = "1";
                }
                else
                {
                    obj.email = "b";
                    obj.password = "2";
                }
                obj.fullName = "Kuala Lumpur";
                
                obj.Gender = 0;
                obj.dateofBirth = DateTime.Now;
                obj.userType = i+1;
                obj.PhoneNum  = 01112822021;
                obj.status = 1;
                context.Shopkeeper.Add(obj);
            }
            context.SaveChanges();
           //for (int i = 0; i < 2; i++)                                                  
           // {
           //     var obj = new ShopkeeperImage
           //     {
           //         shopKeeperId = WorkContext.GetContext().Shopkeeper.Where(x => x.Id == i + 1).ToList().FirstOrDefault().Id,
           //         imageType = "jpg",
           //         image = System.IO.File.ReadAllBytes(@"C:\Arsalan\Arsalan\CCC\LSMVC\LSMVC\Content\2.png")
           //     };

           //     context.ShopkeeperImage.Add(obj);
           // }
           // context.SaveChanges();
            for (int i = 0; i < 4; i++)
            {
                var obj = new Shop
                {
                    No = i,
                    Name = "World" + i,
                    Location = 1,
                    Area = "Main",
                    RegisteredDate = DateTime.Now,
                    Status = true,
                    owner = 1
                };
                context.Shops.Add(obj);
            }
            context.SaveChanges();
            //for (int i = 0; i < 2; i++)
            //{
            //    var obj = new ShopImage
            //    {
            //        shopId = i,
            //        imageType = 0,
            //        shopImage = System.IO.File.ReadAllBytes(@"C:\Arsalan\Arsalan\CCC\LSMVC\LSMVC\Content\2.png")
            //    };

            //    context.ShopImage.Add(obj);
            //}
            //context.SaveChanges();
            //for (int i = 0; i < 2; i++)
            //{
            //    var obj = new ItemImage
            //    {
            //        itemid = i,
            //        imagetype = "image/jpg",
            //        image = System.IO.File.ReadAllBytes(@"C:\Arsalan\Arsalan\CCC\LSMVC\LSMVC\Content\2.png")    
            //    };
                                                         
               
            //    context.ItemImage.Add(obj);
            //}
           // context.SaveChanges();
            for (int i = 1; i < 3; i++)
            {
                var obj = new Item
                {
                    shopId = 1,
                    itemName = "Bag",
                    itemPrice = 898.3,
                    itemAvailablity = 1,
                    itemDetails = "hahaha"
                };
                context.ShopItem.Add(obj);
            }
            context.SaveChanges();
        }
    }
}
