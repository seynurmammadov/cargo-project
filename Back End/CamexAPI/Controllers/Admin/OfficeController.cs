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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OfficeController : ControllerBase
    {
        private readonly IOfficeService _officeContext;
        private readonly IOfficeNameTranslateService _officeTranslateContext;
        public OfficeController(IOfficeService officeContext, IOfficeNameTranslateService officeTranslateContext)
        {
            _officeContext = officeContext;
            _officeTranslateContext = officeTranslateContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            try
            {
                List<Office> offices = _officeContext.GetAll();
                return Ok(offices);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpGet]
        [Route("active")]
        [AllowAnonymous]
        public IActionResult GetActive()
        {
            try
            {
                List<Office> offices = _officeContext.GetAllActive();
                return Ok(offices);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        // POST api/<OfficeController>
        [HttpPost]
        public IActionResult Post([FromBody] Office office)
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
               
                _officeContext.Add(office);
                foreach (OfficeNameTranslate item in office.OfficeNameTranlates)
                {
                    item.OfficeId = office.Id;
                    _officeTranslateContext.Add(item);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // PUT api/<OfficeController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Office office)
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
                Office db_office = _officeContext.GetWithId(id);
                if (db_office == null)
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

                db_office.PriceValue = office.PriceValue;
                db_office.PhoneNumber = office.PhoneNumber;
                db_office.Email = office.Email;
                db_office.Email2 = office.Email2;
                db_office.IsActived = office.IsActived;
                db_office.Url = office.Url;
                _officeContext.Update(db_office);
                foreach (OfficeNameTranslate item in office.OfficeNameTranlates)
                {
                    OfficeNameTranslate db_officeTranslate = _officeTranslateContext.GetWithId(item.Id);
                    db_officeTranslate.Name = item.Name;
                    db_officeTranslate.Address = item.Address;
                    db_officeTranslate.WorkTime = item.WorkTime;
                    _officeTranslateContext.Update(db_officeTranslate);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // DELETE api/<OfficeController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Office db_office = _officeContext.GetWithId(id);
                if (db_office == null)
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
                db_office.IsDeleted = true;
                _officeContext.Update(db_office);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
