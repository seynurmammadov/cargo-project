using Business.Abstract;
using CamexAPI.Identity;
using Entity.Models;
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
    public class EndedController : ControllerBase
    {
        private readonly ICargoService _cargoContext;
        private readonly MyIdentityDbContext _user;
        public EndedController(ICargoService cargoContext
            , MyIdentityDbContext user)
        {
            _cargoContext = cargoContext;
            _user = user;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).FirstOrDefault();
                List<Cargo> cargos = _cargoContext.GetAllActiveUserInvoice(user.Id, "End");
                return Ok(cargos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
