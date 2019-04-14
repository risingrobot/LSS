using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace LSMVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "GetData",
                url: "{controller}/{action}/{name}",
                defaults: new { controller = "ShowShops", action = "getShops"}
            );
            routes.MapRoute(
                name: "Maintainance",
                url: "{controller}/{action}/{shid}",
                defaults: new { controller = "UserRegister", action = "MaintainShop" }
            );
            routes.MapRoute(
                name: "EditItem",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Item", action = "CreateItem" }
            );
            routes.MapRoute(
                name: "GetImage",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Item", action = "getImage" }
            );
        }
    }
}
