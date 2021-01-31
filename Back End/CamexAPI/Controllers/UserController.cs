using CamexAPI.Identity;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyIdentityDbContext _user;
        public UserController(MyIdentityDbContext user)
        {
            _user = user;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_user.Users
                    .Where(u => u.UserName == User.Identity.Name)
                    .Include(u => u.Balance)
                    .Include(u => u.Receipts)
                    .Include(u => u.Orders).ThenInclude(r => r.Receipt)
                    .Include(u => u.Orders).ThenInclude(c => c.Country)
                    .Include(u => u.Orders).ThenInclude(c => c.Status)
                    .Include(u => u.Cargos).ThenInclude(c => c.Product).ThenInclude(p => p.ProductTranslates)
                    .Select(p => new
                    {
                        p.Id,
                        p.Email,
                        p.PhoneNumber,
                        p.CamexId,
                        p.Balance,
                        p.CityId,
                        p.City,
                        p.Address,
                        p.Office,
                        p.OfficeId,
                        p.Image,
                        Cargos= p.Cargos.Where(c => c.IsActived && !c.IsDeleted),
                        Orders= p.Orders.Where(o => o.IsActived && !o.IsDeleted),
                        Receipts = p.Receipts.Where(r => r.IsActived),
                        p.CreatedDate,
                        p.ModifiedDate
                    })
                    .FirstOrDefault());
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

    }
}
