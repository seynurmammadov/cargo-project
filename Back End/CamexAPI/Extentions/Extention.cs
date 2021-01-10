using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BackProject.Extentions
{
    public static class Extention
    {
        public static bool IsType(this IFormFile file, string type)
        {
            return file.ContentType.Contains(type);
        }

        public static bool MaxLength(this IFormFile file, int kb)
        {
            return file.Length / 1024 > kb;
        }
        public async static Task<string> SaveImage(this IFormFile file, string root, params string[] paths)
        {
            string fileName = Guid.NewGuid().ToString() + file.FileName;
            foreach(string item in paths)
            {
                root = Path.Combine(root, item);
            }
            string resultPash = Path.Combine(root, fileName);
            using (FileStream fileStream = new FileStream(resultPash, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return fileName;
        }
        public static bool PhotoValidate(this IFormFile Photo, ModelStateDictionary modelState)
        {
            if (Photo == null)
            {
                modelState.AddModelError("Photo", "Please select photo for course!!!");
                return false;
            }
            if (!Photo.IsType("image"))
            {
                modelState.AddModelError("Photo", "Please select image types!!!");
                return false;
            }

            if (Photo.MaxLength(3000))
            {
                modelState.AddModelError("Photo", "Image length must be max 300kb!!!");
                return false;
            }
            return true;
        }
        public static string GetAllErrors(this ModelStateDictionary modelState, IdentityResult result)
        {
            string errors = "";
            foreach (var error in result.Errors)
            {
                errors = error.Description + "\n";
            }
            return errors;
        }
    }

}
