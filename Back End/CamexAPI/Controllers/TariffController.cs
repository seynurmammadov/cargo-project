using Business.Abstract;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
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
    public class TariffController : ControllerBase
    {
        private readonly ITariffService _tariffContext;
        private readonly IPriceService _priceContext;
        public TariffController(ITariffService tariffContext, IPriceService priceContext)
        {
            _tariffContext = tariffContext;
            _priceContext = priceContext;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult Get(int id)
        {
            try
            {
                List<Tariff> tariffs = _tariffContext.GetAll(t=>t.CountryId==id);
                return Ok(tariffs);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPost]
        [Authorize]
        public IActionResult Create([FromForm] Tariff tariff)
        {
            try
            {
                tariff.PriceLists = JsonSerializer.Deserialize<ICollection<PriceList>>(tariff.Prices);
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
              
                _tariffContext.Add(tariff);

                foreach (PriceList item in tariff.PriceLists)
                {
                    item.TariffId = tariff.Id;
                    _priceContext.Add(item);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutAsync(int id, [FromForm] Tariff tariff)
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
                Tariff db_tariff = _tariffContext.GetWithId(id);
                if (db_tariff == null)
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

                db_tariff.To = tariff.To;
                _tariffContext.Update(db_tariff);
                return Ok();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            try
            {
                Tariff db_tariff = _tariffContext.GetWithId(id);
                if (db_tariff == null)
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
                _tariffContext.Detele(db_tariff.Id);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpGet("withId/{id}")]
        [AllowAnonymous]
        public IActionResult GetId(int id)
        {
            try
            {
                Tariff tariff = _tariffContext.GetWithId(id);
                if (tariff == null)
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
                return Ok(tariff);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
