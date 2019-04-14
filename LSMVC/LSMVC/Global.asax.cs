using LSMVC.Content;
using LSMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace LSMVC
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
           
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
           // Database.SetInitializer<WorkContext>();
            //ShopsJVObjectData.GetData();

        }
        protected void Session_Start(Object sender, EventArgs e)
        {            
            Session["id"] = new Random().Next(0, 999999999);
            
        }
        protected void Session_End(Object sender, EventArgs e)
        {
           // LSMVC.Content.LoginClass.lstobj.Where(x=>x != null).ToList().RemoveAll(x => x.session == Session["id"].ToString());          
          //  Session["id"] = "";
        }
    }
}
public class ShopsJVObjectData
{
    public static List<Shop> shopData;
    
    public static void GetData()
    {
        shopData = WorkContext.GetContext().Shops.ToList(); 
    }
}
