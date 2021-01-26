using CamexAPI.Controllers.Admin;
using CamexAPI.Models;
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
        public static ValidateModel PhotoValidate(this IFormFile Photo)
        {
            if (Photo == null)
            {
                return new ValidateModel
                {
                    Success = false,
                    Response = new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Please select image!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пожалуйста выберите изображение!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Zəhmət olmasa şəkil seçin!"
                            }
                        }
                    }
                };
            }
            if (!Photo.IsType("image"))
            {
                return new ValidateModel
                {
                    Success = false,
                    Response = new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Please select image!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пожалуйста выберите изображение!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Zəhmət olmasa şəkil seçin!"
                            }
                        }
                    }
                };
            }

            if (Photo.MaxLength(3000))
            {
                return new ValidateModel
                {
                    Success = false,
                    Response = new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Image length must be max 300kb!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Размер фотографии должен состовлять не более 300 кб!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Şəkilin ölçüsü 300 kb cox olmalı deyil!"
                            }
                        }
                    }
                };
            }
            return new ValidateModel
            {
                Success = true,
                Response = new Response
                {
                    Status = "Ok",
                    Messages = new Message[] { }
                }
            };
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
