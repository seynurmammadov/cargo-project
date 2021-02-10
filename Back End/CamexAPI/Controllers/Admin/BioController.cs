using BackProject.Extentions;
using Business.Abstract;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class BioController : ControllerBase
    {
        private readonly IBioService _bioContext;
        private readonly IWebHostEnvironment _env;
        public BioController(IBioService bioContext, IWebHostEnvironment env)
        {
            _bioContext = bioContext;
            _env = env;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            try
            {
                List<Bio> bio = _bioContext.GetAll();
                return Ok(bio);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles ="Admin,MainAdmin,Moderator")]
        public async Task<IActionResult> PutAsync(int id, [FromForm] Bio bio)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Model state isn't valid!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Состояние модели недействительно!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Model vəziyyəti etibarsızdır!"
                            }
                        }
                    });
                }
                Bio db_bio = _bioContext.GetWithId(id);
                if (db_bio == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Model state isn't valid!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Состояние модели недействительно!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Model vəziyyəti etibarsızdır!"
                            }
                        }
                    });
                if (bio.Photo != null)
                {
                    ValidateModel res = bio.Photo.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);

                    string folder = Path.Combine("Site", "images", "bio");
                    string fileName = await bio.Photo.SaveImage(_env.WebRootPath, folder);
                    db_bio.LogoNavbar= fileName;
                }

                if (db_bio.Photo2 != null)
                {
                    ValidateModel res = bio.Photo2.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);

                    string folder = Path.Combine("Site", "images", "bio");
                    string fileName = await bio.Photo2.SaveImage(_env.WebRootPath, folder);
                    db_bio.LogoFooter = fileName;
                }
                db_bio.PageTitle = bio.PageTitle;
                db_bio.ShortDescAz = bio.ShortDescAz;
                db_bio.ShortDescRus = bio.ShortDescRus;
                db_bio.ShortDescEng = bio.ShortDescEng;
                db_bio.SliderTitleAz = bio.SliderTitleAz;
                db_bio.SliderTitleRus = bio.SliderTitleRus;
                db_bio.SliderTitleEng = bio.SliderTitleEng;
                db_bio.CallCenter = bio.CallCenter;

                _bioContext.Update(db_bio);
                return Ok();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
