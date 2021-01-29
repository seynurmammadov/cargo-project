using BackProject.Extentions;
using Business.Abstract;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryContext;
        private readonly INoticeTranslateService _noticeContext;
        private readonly IWebHostEnvironment _env;
        public CountryController(ICountryService countryContext, IWebHostEnvironment env, INoticeTranslateService noticeContext)
        {
            _countryContext = countryContext;
            _env = env;
            _noticeContext = noticeContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Country> countries = _countryContext.GetAll();
                return Ok(countries);
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
                List<Country> countries = _countryContext.GetAllActive();
                return Ok(countries);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // POST api/<CountryController>
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Country country)
        {
            try
            {
                country.NoticeTranslate = JsonSerializer.Deserialize<ICollection<NoticeTranslate>>(country.Notices);
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
                ValidateModel res = country.Photo.PhotoValidate();
                if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);
                ValidateModel res2 = country.FlagPhoto.PhotoValidate();
                if (!res2.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);
                string folder = Path.Combine("Site", "images", "countries");
                string fileName = await country.Photo.SaveImage(_env.WebRootPath, folder);
                country.Image = fileName;
                fileName = await country.FlagPhoto.SaveImage(_env.WebRootPath, folder);
                country.BgImage = fileName;
                _countryContext.Add(country);

                foreach (NoticeTranslate item in country.NoticeTranslate)
                {
                    item.CountryId = country.Id;
                    _noticeContext.Add(item);
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
        public async Task<IActionResult> PutAsync(int id, [FromForm] Country country)
        {
            try
            {
                country.NoticeTranslate = JsonSerializer.Deserialize<ICollection<NoticeTranslate>>(country.Notices);
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
                Country db_country = _countryContext.GetWithId(id);
                if(db_country== null)
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
                if (country.Photo != null)
                {
                    ValidateModel res = country.Photo.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);

                    string folder = Path.Combine("Site", "images", "countries");
                    string fileName = await country.Photo.SaveImage(_env.WebRootPath, folder);
                    db_country.Image = fileName;
                }

                if (country.FlagPhoto != null)
                {
                    ValidateModel res = country.FlagPhoto.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);

                    string folder = Path.Combine("Site", "images", "countries");
                    string fileName = await country.FlagPhoto.SaveImage(_env.WebRootPath, folder);
                    db_country.BgImage = fileName;
                }
                db_country.Name = country.Name;
                db_country.Value = country.Value;
                db_country.IsActived = country.IsActived;
                db_country.Wallet = country.Wallet;
                _countryContext.Update(db_country);
                foreach (NoticeTranslate item in country.NoticeTranslate)
                {
                    NoticeTranslate db_noticeTranslate = _noticeContext.GetWithId(item.Id);
                    db_noticeTranslate.Name = item.Name;
                    _noticeContext.Update(db_noticeTranslate);
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
                Country db_country = _countryContext.GetWithId(id);
                if(db_country== null)
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
                db_country.IsDeleted = true;
                _countryContext.Update(db_country);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                Country country = _countryContext.GetWithId(id);
                if (country == null)
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
                return Ok(country);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
