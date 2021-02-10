using BackProject.Extentions;
using Business.Abstract;
using CamexAPI.Controllers.Admin;
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
using System.Text.Json;
using System.Threading.Tasks;

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsContext;
        private readonly INewsTranslateService _newsTranslateContext;
        private readonly IWebHostEnvironment _env;
        public NewsController(INewsService newsContext, INewsTranslateService newsTranslateContext, IWebHostEnvironment env)
        {
            _newsContext = newsContext;
            _env = env;
            _newsTranslateContext = newsTranslateContext;
        }

        [HttpGet]

        [AllowAnonymous]
        public IActionResult Get()
        {
            try
            {
                List<News> news = _newsContext.GetAll();
                return Ok(news);
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
                List<News> news = _newsContext.GetAllActive();
                return Ok(news);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpGet("{id}")]

        [AllowAnonymous]
        public IActionResult GetActive(int id)
        {
            try
            {
                News news = _newsContext.GetWithId(id);
                return Ok(news);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        

       // POST api/<CountryController>
       [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateAsync([FromForm] News news)
        {
            try
            {
                news.NewsTranslates = JsonSerializer.Deserialize<ICollection<NewsTranslate>>(news.Translates);
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
                ValidateModel res = news.Photo.PhotoValidate();
                if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);
                string folder = Path.Combine("Site", "images", "news");
                string fileName = await news.Photo.SaveImage(_env.WebRootPath, folder);
                news.Image = fileName;

                _newsContext.Add(news);
                foreach (NewsTranslate item in news.NewsTranslates)
                {
                    item.NewsId = news.Id;
                    _newsTranslateContext.Add(item);
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
        [Authorize]
        public async Task<IActionResult> PutAsync(int id, [FromForm] News news)
        {
            try
            {
                news.NewsTranslates = JsonSerializer.Deserialize<ICollection<NewsTranslate>>(news.Translates);
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
                News db_news = _newsContext.GetWithId(id);
                if (db_news == null)
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
                if (news.Photo != null)
                {
                    ValidateModel res = news.Photo.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);

                    string folder = Path.Combine("Site", "images", "news");
                    string fileName = await news.Photo.SaveImage(_env.WebRootPath, folder);
                    news.Image = fileName;
                }
                db_news.IsActived = news.IsActived;
                _newsContext.Update(db_news);
                foreach (NewsTranslate item in news.NewsTranslates)
                {
                    NewsTranslate db_Translate = _newsTranslateContext.GetWithId(item.Id);
                    db_Translate.Title = item.Title;
                    db_Translate.Description = item.Description;
                    _newsTranslateContext.Update(db_Translate);
                }
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
                News db_news = _newsContext.GetWithId(id);
                if (db_news == null)
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
                db_news.IsDeleted = true;
                _newsContext.Update(db_news);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}

