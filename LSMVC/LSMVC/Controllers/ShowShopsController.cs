using LSMVC.Content;
using LSMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace LSMVC.Controllers
{
    public class ShowShopsController : Controller
    {
        // GET: ViewShop
        Shop[] obj =null;
        City Cobj =null;
        List<City> citylist = null;
        
        public ShowShopsController()
        {
           
        }        
        public ActionResult ShowShops()
        {
            if (Session != null && Session["Loginobj"] != null)
            {
                LoginClass.setlst((LoginClass)Session["Loginobj"]);
                return View();
            }
            return new RedirectResult("~/Home/Logout");
        }
        [HttpPost]
        public ActionResult getShops(string name)
        {
           
           citylist = WorkContext.GetContext().City.ToList();
            int myInt = 0;
            bool isNumerical = int.TryParse(name, out myInt);
            if (isNumerical)
            {
                obj = WorkContext.GetContext().Shops.Where(x => x.Location == myInt).Take(50).OrderBy(x=>x.ID).ToArray();
                if (obj != null && obj.Length > 0)
                {
                    return Json(obj, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return RedirectToAction("ChooseShop", "UserRegister");
                }
                
            }
            else
            {
                if (!(name.Trim().Equals("")))
                {
                    string[] info = name.Split(',');

                    foreach (var item in info)
                    {
                        foreach (var item2 in info)
                        {
                            foreach (var cityname in citylist)
                            {
                                if (item.Trim() == cityname.cityName && item2.Trim() == cityname.countryName || item.Trim() == cityname.countryName && item2.Trim() == cityname.cityName ||
                                    item2.Trim() == cityname.cityName)
                                { Cobj = cityname; }
                            }
                        }
                    }

                    if (Cobj != null)
                    {
                        obj = WorkContext.GetContext().Shops.Where(x => x.Location == Cobj.ID).Take(50).ToArray();
                        return Json(obj, JsonRequestBehavior.AllowGet);
                    }
                }
            }
             return RedirectToAction("ChooseShop", "UserRegister");
        }
        [HttpPost]
        public ActionResult getperson()
        {
            var objx = LoginClass.getlst();
            return Json(objx, JsonRequestBehavior.AllowGet);            
        }
        [HttpPost]
        public ActionResult getsessionid()
        {
            var objx = Session["id"];
            return Json(objx, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult GetMoreShops(long ID)
        {
            obj = WorkContext.GetContext().Shops.Where(x => x.ID > ID).Take(6).OrderBy(x => x.ID).ToArray();
            if (obj.Length > 0)
            {
                return Json(obj, JsonRequestBehavior.AllowGet);
            }
            return null;
        }
        [HttpPost]
        public JsonResult setperson(string sessionid,int x,int y)
        {
            if (LoginClass.getlst() != null && LoginClass.getlst().Count > 0)
            {
                LoginClass.getlst().Where(xx => xx != null).Where(xx => xx.session == sessionid).FirstOrDefault().m = x;
                LoginClass.getlst().Where(xx => xx != null).Where(xx => xx.session == sessionid).FirstOrDefault().n = y;
            }
             
            return null;
        }
    }
}
