using LSMVC.Content;
using LSMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
namespace LSMVC.Controllers
{
    public class ItemController : Controller
    {
        WorkContext context = WorkContext.GetContext();
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        public ActionResult MaintainShop()
        {
            List<Shop> shopsmodel = null;
            List<ItemType> itemTypemodel = context.ItemType.ToList();
             long id = LoginClass.lstobj.Where(x => x != null).Where(x => x.session == Session["id"].ToString()).FirstOrDefault().id;
                if (id > 0)
                {
                   shopsmodel = context.Shops.Where(x => x.owner == id).ToList();
                }          
            
            
           // List<Item> Itemmodel = new WorkContext().ShopItem.Where(x => x.shopid == item2).ToList();

            // return Json(model.ElementAt(0).ShopImage, JsonRequestBehavior.AllowGet);
            return View(new Tuple<Item, List<ItemType>, List<Shop>, List<Item>>(null, itemTypemodel, shopsmodel, null));
        }
        bool readonce = false;
        [System.Web.Http.HttpPost]
        [System.Web.Http.AllowAnonymous]
        public ActionResult CreateItem(Item item1, List<int> item2, List<int> item3,HttpPostedFileBase ImageFileItem)
        {
            ItemImage ItemImageobj = new ItemImage();
            Item_Types Item_Typesobj = new Item_Types();
            byte[] buf = null;
            foreach (int shopid in item3)
            {
                item1.shopId = shopid;
                context.ShopItem.Add(item1);
                context.SaveChanges();
                if (ImageFileItem.ContentLength > 0 && !readonce)
                {
                    buf = new byte[ImageFileItem.ContentLength];
                    ImageFileItem.InputStream.Read(buf, 0, buf.Length);
                    readonce = true;
                }
                ItemImageobj.image = buf;
                ItemImageobj.imagetype = ImageFileItem.ContentType;
                ItemImageobj.itemid = item1.ID;
                context.ItemImage.Add(ItemImageobj);
                context.SaveChanges();
                foreach (int itemtypes in item2)
                {
                    Item_Typesobj.itemId = item1.ID;
                    Item_Typesobj.itemtypeId = itemtypes;
                    context.Item_Types.Add(Item_Typesobj);
                    context.SaveChanges();
                }
            }


            return RedirectToAction("ChooseShop", "Item");
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.AllowAnonymous]
        public ActionResult EditItem(Item item1, List<LSMVC.Models.ShopType> item2, List<LSMVC.Models.Shop> item3, HttpPostedFileBase ImageFileItem)
        {

            return null;
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.AllowAnonymous]
        public ActionResult RemoveItem(Item item1, List<LSMVC.Models.ShopType> item2, List<LSMVC.Models.Shop> item3, HttpPostedFileBase ImageFileItem)
        {

            return null;
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.AllowAnonymous]
        public JsonResult Selectitem(List<int> id)
        {
           
            List<object> fiobj = new List<object>();
            if (id != null && id.Count > 0)
            {
                foreach (int item in id)
                {
                   // List<Item> obj = context.ShopItem.Where(x => x.shopid == item).ToList();
                    var orderForBooks = (from bk in context.ShopItem
                                        join ordr in context.Shops
                                        on bk.shopId equals ordr.ID
                                        join img in context.ItemImage
                                        on bk.ID equals img.itemid
                                       where bk.shopId == item                                       
                                select new
                                {
                                    bk.ID,
                                    ordr.Name,
                                    bk.itemName,
                                    bk.itemDetails,
                                    bk.itemPrice,
                                    bk.itemAvailablity
                                }).ToList();
                    if (orderForBooks.Count > 0)
                    {
                        fiobj.Add(orderForBooks);
                    }

                }
            }
            return Json(fiobj);
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.AllowAnonymous]
        public JsonResult getitems(int id)
        {            
            if (id != 0 )
            {                
                    // List<Item> obj = context.ShopItem.Where(x => x.shopid == item).ToList();
                   var orderForBooks = (from bk in context.ShopItem.Where(x=>x.shopId == id)                                        
                                        join ordr in context.Shops
                                         on bk.shopId equals ordr.ID
                                         select new
                                         {
                                             bk.ID,
                                             ordr.Name,
                                             bk.itemName,
                                             bk.itemDetails,
                                             bk.itemPrice,
                                             bk.itemAvailablity
                                         }).ToList();
                return Json(orderForBooks);

            }
                return null;
        }
        
        
        [System.Web.Http.HttpGet]
        [System.Web.Http.AllowAnonymous]
        public ActionResult getImage(int id)
        {
            List<ItemImage> obj = null;
            obj = context.ItemImage.Where(x=>x.itemid == id).ToList();
            ItemImage a = obj.ElementAt(0);
        return File(a.image, a.imagetype); // Might need to adjust the content type based on your actual image type
        }
        [System.Web.Http.HttpGet]
        [System.Web.Http.AllowAnonymous]
        public ActionResult getImage2(int id)
        {

            List<ItemImage> obj = context.ItemImage.Where(x => x.itemid == id).ToList();

            return Json(obj.ElementAt(0).image, JsonRequestBehavior.AllowGet); // Might need to adjust the content type based on your actual image type
        }
    }
}
