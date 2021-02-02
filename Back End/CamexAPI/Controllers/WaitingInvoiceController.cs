using BackProject.Extentions;
using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaitingInvoiceController : ControllerBase
    {
        private readonly ICargoService _cargoContext;
        private readonly IStatusService _statusContext;
        private readonly IWebHostEnvironment _env;
        private readonly MyIdentityDbContext _user;
        public WaitingInvoiceController(ICargoService cargoContext
            , MyIdentityDbContext user, IStatusService statusContext, IWebHostEnvironment env)
        {
            _cargoContext = cargoContext;
            _statusContext = statusContext;
            _env = env;
            _user = user;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).FirstOrDefault();
                List<Cargo> cargos = _cargoContext.GetAllActiveUserInvoice(user.Id, "WaitingInvoice");
                return Ok(cargos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        // PUT api/<CountryController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromForm] Cargo cargo)
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
                Cargo db_cargo = _cargoContext.GetWithId(id);
                if (db_cargo == null)
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

                if (cargo.Image == null || cargo.Image=="")
                {
                    ValidateModel res = cargo.Photo.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);
                    string folder = Path.Combine("Site", "images", "statements");
                    string fileName = await cargo.Photo.SaveImage(_env.WebRootPath, folder);
                    db_cargo.Image = fileName;
                }
                db_cargo.Name = cargo.Name;
                db_cargo.ProductId = cargo.ProductId;
                db_cargo.Price = cargo.Price;
                db_cargo.CountryId = cargo.CountryId;
                db_cargo.Count = cargo.Count;
                db_cargo.Notice = cargo.Notice;
                db_cargo.ModifiedDate = DateTime.Now;
                db_cargo.StatusId = _statusContext.GetWithStatement("InAnbar").Id;
                _cargoContext.Update(db_cargo);
                return Ok();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
