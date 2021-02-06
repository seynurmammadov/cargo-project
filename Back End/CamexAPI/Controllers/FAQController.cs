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
    public class FAQController : ControllerBase
    {
        private readonly IFAQService _faqContext;
        private readonly IFAQTranslateService _faqTranslateContext;
        public FAQController(IFAQService faqContext, IFAQTranslateService faqTranslateContext)
        {
            _faqContext = faqContext;
            _faqTranslateContext = faqTranslateContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<FAQ> faqs = _faqContext.GetAll();
                return Ok(faqs);
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
                List<FAQ> faqs = _faqContext.GetAllActive();
                return Ok(faqs);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // POST api/<CountryController>
        [HttpPost]
        public IActionResult Create([FromForm] FAQ faq)
        {
            try
            {
                faq.FAQTranslates = JsonSerializer.Deserialize<ICollection<FAQTranslate>>(faq.Translates);
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
                _faqContext.Add(faq);
                foreach (FAQTranslate item in faq.FAQTranslates)
                {
                    item.FAQId = faq.Id;
                    _faqTranslateContext.Add(item);
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
        public IActionResult PutAsync(int id, [FromForm] FAQ faq)
        {
            try
            {

                faq.FAQTranslates = JsonSerializer.Deserialize<ICollection<FAQTranslate>>(faq.Translates);
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
                FAQ db_faq = _faqContext.GetWithId(id);
                if (db_faq == null)
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

                db_faq.IsActived = faq.IsActived;
                _faqContext.Update(db_faq);
                foreach (FAQTranslate item in faq.FAQTranslates)
                {
                    FAQTranslate db_Translate = _faqTranslateContext.GetWithId(item.Id);
                    db_Translate.Title = item.Title;
                    db_Translate.Description = item.Description;
                    _faqTranslateContext.Update(db_Translate);
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
                FAQ db_faq= _faqContext.GetWithId(id);
                if (db_faq == null)
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
                db_faq.IsDeleted = true;
                _faqContext.Update(db_faq);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
