using BackProject.Extentions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BackProject.Helpers
{
    public static class Helper
    {
        public static void DeleteFile(string root, string fileName, params string[] paths)
        {
            foreach (string item in paths)
            {
                root = Path.Combine(root, item);
            }
            string deletePath = Path.Combine(root, fileName);
            if (System.IO.File.Exists(deletePath))
            {
                System.IO.File.Delete(deletePath);
            }
        }
        public enum Roles {
            Admin,
            PrivateCustomer,
            BusinessCustomer,
            Moderator,
            MainAdmin
        }
    
    }
}
