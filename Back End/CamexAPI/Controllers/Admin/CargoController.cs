using BackProject.Extentions;
using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class CargoController : ControllerBase
    {
        private readonly ICargoService _cargoContext;
        private readonly IStatusService _statusContext;
        private readonly IWebHostEnvironment _env;
        private readonly MyIdentityDbContext _user;
        public CargoController(ICargoService cargoContext
            , MyIdentityDbContext user, IStatusService statusContext, IWebHostEnvironment env)
        {
            _cargoContext = cargoContext;
            _statusContext = statusContext;
            _env = env;
            _user = user;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Cargo cargo)
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

                AppUser user = _user.Users.Where(u => u.Id == cargo.UserId).FirstOrDefault();
                if (user == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
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
                cargo.IsActived = true;
                cargo.OfficeId = user.OfficeId;
                cargo.UserId = user.Id;
                cargo.StatusId = _statusContext.GetWithStatement("InAnbar").Id;
                cargo.TrackCamex = Guid.NewGuid().ToString() + user.CamexId;
                ValidateModel res = cargo.Photo.PhotoValidate();
                if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);
                string folder = Path.Combine("Site", "images", "statements");
                string fileName = await cargo.Photo.SaveImage(_env.WebRootPath, folder);
                cargo.Image = fileName;

                _cargoContext.Add(cargo);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
