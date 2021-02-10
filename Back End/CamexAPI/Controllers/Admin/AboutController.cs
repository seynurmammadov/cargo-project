using Business.Abstract;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly IAboutService _aboutContext;
        public AboutController(IAboutService aboutContext)
        {
            _aboutContext = aboutContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            try
            {
                List<About> about = _aboutContext.GetAll();
                return Ok(about);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,MainAdmin,Moderator")]
        public IActionResult Put(int id, [FromForm] About about)
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
                About db_about = _aboutContext.GetWithId(id);
                if (db_about == null)
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

                db_about.DescAz = about.DescAz;
                db_about.DescRus = about.DescRus;
                db_about.DescEng = about.DescEng;


                _aboutContext.Update(db_about);
                return Ok();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
