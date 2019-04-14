using LSMVC.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;

namespace LSMVC.Controllers
{
    public class ViewShopController : Controller
    {
        WorkContext context = WorkContext.GetContext();
        public ActionResult ViewShop(int id)
        {
            //var itemlist = (from bk in context.ShopItem
            //                     join ordr in context.Shops
            //                     on bk.shopid equals ordr.id
            //                     join img in context.ItemImage
            //                     on bk.id equals img.itemid
            //                     where bk.shopid == id
            //                     select new
            //                     {
            //                         bk.id,
            //                         bk.ItemName,
            //                         bk.ItemDetails,
            //                         bk.Price,
            //                         bk.Available
            //                     }).ToList();
            ViewBag.value = id;
           return View();
        }
    }
}
