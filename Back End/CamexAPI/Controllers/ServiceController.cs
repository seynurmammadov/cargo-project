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
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceContext;
        private readonly IServiceTranslateService _serviceTranslateContext;
        private readonly IWebHostEnvironment _env;
        public ServiceController(IServiceService serviceContext, IServiceTranslateService serviceTranslateContext, IWebHostEnvironment env)
        {
            _serviceContext = serviceContext;
            _env = env;
            _serviceTranslateContext = serviceTranslateContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Service> services = _serviceContext.GetAll();
                return Ok(services);
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
                List<Service> services = _serviceContext.GetAllActive();
                return Ok(services);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // POST api/<CountryController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateAsync([FromForm] Service service)
        {
            try
            {
                service.ServiceTranslates = JsonSerializer.Deserialize<ICollection<ServiceTranslate>>(service.Translates);
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
                ValidateModel res = service.Photo.PhotoValidate();
                if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);
                string folder = Path.Combine("Site", "images", "serviceIcon");
                string fileName = await service.Photo.SaveImage(_env.WebRootPath, folder);
                service.Image = fileName;

                _serviceContext.Add(service);
                foreach (ServiceTranslate item in service.ServiceTranslates)
                {
                    item.ServiceId = service.Id;
                    _serviceTranslateContext.Add(item);
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
        public async Task<IActionResult> PutAsync(int id, [FromForm] Service service)
        {
            try
            {
                service.ServiceTranslates = JsonSerializer.Deserialize<ICollection<ServiceTranslate>>(service.Translates);
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
                Service db_service = _serviceContext.GetWithId(id);
                if (db_service == null)
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
                if (service.Photo != null)
                {
                    ValidateModel res = service.Photo.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);

                    string folder = Path.Combine("Site", "images", "serviceIcon");
                    string fileName = await service.Photo.SaveImage(_env.WebRootPath, folder);
                    db_service.Image = fileName;
                }
                db_service.IsActived = service.IsActived;

                _serviceContext.Update(db_service);
                foreach (ServiceTranslate item in service.ServiceTranslates)
                {
                    ServiceTranslate db_Translate = _serviceTranslateContext.GetWithId(item.Id);
                    db_Translate.Title = item.Title;
                    db_Translate.Description = item.Description;
                    _serviceTranslateContext.Update(db_Translate);
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
                Service db_service= _serviceContext.GetWithId(id);
                if (db_service == null)
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
                db_service.IsDeleted = true;
                _serviceContext.Update(db_service);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
