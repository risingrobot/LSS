using LSMVC.Content;
using LSMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LSMVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //string naem = EncryptClass.getpassword("Arsalan");
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
           return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        
        public ActionResult Logout()
        {
            LoginClass obj = LoginClass.lstobj.Where(x=> Session["id"] != null &&  x!= null && x.session == Session["id"].ToString()).FirstOrDefault();
            if (obj != null)
            {
                LoginClass.lstobj.RemoveAll(x => x.session == Session["id"].ToString() || x.email == obj.email);
                Session.Abandon();
            }            
            return View();
        }
        public ActionResult ShopRegister()
        {
            return View(new Tuple<Shop, SHOPKEEPER, List<ShopType>>(null, null, WorkContext.GetContext().Shoptype.ToList()));
        }
        public ActionResult UserRegister()
        {

            return View();
        }
        public ActionResult ClearSession(string session)
        {
           // LoginClass.lstobj.RemoveAll(x => x.session == session);
          //  Session.Abandon();
            return null;
        }
    }
}