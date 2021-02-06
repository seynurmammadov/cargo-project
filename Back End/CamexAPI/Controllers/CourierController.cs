using Business.Abstract;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourierController : ControllerBase
    {
        private readonly ICourierLocationService _courierContext;
        private readonly ICourierTranslateService _courierTranslateContext;
        public CourierController(ICourierLocationService courierContext, ICourierTranslateService courierTranslateContext)
        {
            _courierContext = courierContext;
            _courierTranslateContext = courierTranslateContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<CourierLocation> couriers = _courierContext.GetAll();
                return Ok(couriers);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpGet]
        [Route("active")]
        public IActionResult GetActive()
        {
            try
            {
                List<CourierLocation> couriers = _courierContext.GetAllActive();
                return Ok(couriers);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // POST api/<CountryController>
        [HttpPost]
        public IActionResult Create([FromForm] CourierLocation courier)
        {
            try
            {
                courier.CourierTranslates = JsonSerializer.Deserialize<ICollection<CourierTranslate>>(courier.Translates);
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
                _courierContext.Add(courier);
                foreach (CourierTranslate item in courier.CourierTranslates)
                {
                    item.CourierLocationId = courier.Id;
                    _courierTranslateContext.Add(item);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }

        // PUT api/<CountryController>/5
        [HttpPut("{id}")]
        public IActionResult PutAsync(int id, [FromForm] CourierLocation courier)
        {
            try
            {
                courier.CourierTranslates = JsonSerializer.Deserialize<ICollection<CourierTranslate>>(courier.Translates);
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
                CourierLocation db_courier = _courierContext.GetWithId(id);
                if (db_courier == null)
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

                db_courier.IsActived = courier.IsActived;
                db_courier.Price = courier.Price;
                _courierContext.Update(db_courier);
                foreach (CourierTranslate item in courier.CourierTranslates)
                {
                    CourierTranslate db_Translate = _courierTranslateContext.GetWithId(item.Id);
                    db_Translate.Name = item.Name;
                    _courierTranslateContext.Update(db_Translate);
                }

                return Ok();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }



        // DELETE api/<CountryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                CourierLocation db_courier = _courierContext.GetWithId(id);
                if (db_courier == null)
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
                db_courier.IsDeleted = true;
                _courierContext.Update(db_courier);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
