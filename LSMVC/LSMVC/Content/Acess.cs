using LSMVC.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace LSMVC.Content
{
    public class Acess
    {
        public static int Enabled = 1;
        public static int Off = 0;
        public static int waitingforApprovel = 2;
    }
    public class AcessType
    {
        public static int admin = 0;
        public static int User = 1;
        public static int ShopKeeper = 2;

    }
    public class LoginClass
    {
        public LoginClass(long id, string emailx, string sessionid)
        {
            this.id = id;
            this.email = emailx;
            this.session = sessionid;          
        }
        public long id = 0;
        public string email = "";
        public string session = "";
        public int m = 100;
        public int n = 80;
        public static List<LoginClass> lstobj = new List<LoginClass>();
        public static void setmn(string sessionid,int mx, int nx)
        {
             lstobj.Where(x => x != null).Where(x => x.session == sessionid).FirstOrDefault().m = mx;
            lstobj.Where(x => x != null).Where(x => x.session == sessionid).FirstOrDefault().n = nx;
        }
        public static void setlst(LoginClass obj)
        {
            if (!(lstobj.Contains(obj)))
            {

                lstobj.Add(obj);
            }
            
        }
        public static List<LoginClass> getlst()
        {
            return lstobj;
        }
    }
    public class ControllerClass
    {
        public static ShowShopsController ShowShopsController = null;
        public static int ShowShopsControllerx = 0;
        public static void setobj(ShowShopsController ob)
        {
            ShowShopsController = ob;
        }
    }
    public class EncryptClass
    {
        public static string  getpassword(string password)
        {           
            byte[] salt = GenerateSalt();
            byte[] hashedPassword = HashPasswordWithSalt(Encoding.UTF8.GetBytes(password), salt);
            
            return Convert.ToBase64String(hashedPassword);
        }
        static byte[] GenerateSalt()
        {
            const int saltLength = 64;

            using (var randomNumberGenerator = new RNGCryptoServiceProvider())
            {
                var randomNumber = new byte[saltLength];
                randomNumberGenerator.GetBytes(randomNumber);

                return randomNumber;
            }
        }
        static byte[] Combine(byte[] first, byte[] second)
        {
            var ret = new byte[first.Length + second.Length];

            Buffer.BlockCopy(first, 0, ret, 0, first.Length);
            Buffer.BlockCopy(second, 0, ret, first.Length, second.Length);

            return ret;
        }
        static byte[] HashPasswordWithSalt(byte[] toBeHashed, byte[] salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combinedHash = Combine(toBeHashed, salt);

                return sha256.ComputeHash(combinedHash);
            }
        }

    }

}