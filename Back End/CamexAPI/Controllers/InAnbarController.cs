using Business.Abstract;
using CamexAPI.Identity;
using Entity.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InAnbarController : ControllerBase
    {
        private readonly ICargoService _cargoContext;
        private readonly IStatusService _statusContext;
        private readonly IWebHostEnvironment _env;
        private readonly MyIdentityDbContext _user;
        public InAnbarController(ICargoService cargoContext
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
                List<Cargo> cargos = _cargoContext.GetAllActiveInAnbar(user.Id);
                return Ok(cargos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
