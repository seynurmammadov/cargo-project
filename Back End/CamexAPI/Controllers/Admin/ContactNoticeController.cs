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
    public class ContactNoticeController : ControllerBase
    {
        private readonly IContactNoticeService _noticeContext;
        public ContactNoticeController(IContactNoticeService noticeContext)
        {
            _noticeContext = noticeContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            try
            {
                List<ContactNotice> contactNotice = _noticeContext.GetAll();
                return Ok(contactNotice);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,MainAdmin,Moderator")]
        public IActionResult Put(int id, [FromForm] ContactNotice contactNotice)
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
                ContactNotice db_contactNotice = _noticeContext.GetWithId(id);
                if (db_contactNotice == null)
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

                db_contactNotice.DescAz = contactNotice.DescAz;
                db_contactNotice.DescRus = contactNotice.DescRus;
                db_contactNotice.DescEng = contactNotice.DescEng;
                _noticeContext.Update(db_contactNotice);
                return Ok();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
