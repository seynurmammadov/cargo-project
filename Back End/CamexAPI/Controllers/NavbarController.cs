using BackProject.Helpers;
using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models.VM;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NavbarController : ControllerBase
    {

       /* private readonly UserManager<AppUser> _userManager;*/
        private readonly MyIdentityDbContext _userDbContext;
        private readonly IBusinessCustomerService _businessContext;
        private readonly IPrivateCustomerService _privateContext;

        public NavbarController(MyIdentityDbContext userDbContext, IBusinessCustomerService businessContext, IPrivateCustomerService privateContext)
        {
            _userDbContext = userDbContext;
            _businessContext = businessContext;
            _privateContext = privateContext;
        }

        [HttpGet]
        [Authorize]
        [Route("get-user-info")]
        public IActionResult GetUser()
        {
            string UserName = User.Identity.Name;
            List<string> Roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value.ToString()).ToList();
            AppUser user = _userDbContext.Users
                        .Where(u => u.UserName == UserName)
                        .Include(u => u.Balance)
                        .FirstOrDefault();
            foreach (string role in Roles)          
            {
                if (role == Helper.Roles.BusinessCustomer.ToString())
                {
                    
                    BusinessCustomer businessCustomer = _businessContext.GetWithCamexId(user.CamexId);
                    UserNavVM userNav = new UserNavVM
                    {
                        CompanyName = businessCustomer.CompanyName,
                        UserBalance = user.Balance.UserBalance
                    };

                    return Ok(userNav);
                }
                else if (role == Helper.Roles.PrivateCustomer.ToString())
                {
                    PrivateCustomer privateCustomer = _privateContext.GetWithCamexId(user.CamexId);
                    UserNavVM userNav = new UserNavVM
                    {
                        Name= privateCustomer.Name,
                        Surname=privateCustomer.Surname,
                        UserBalance = user.Balance.UserBalance
                    };

                    return Ok(userNav);
                }
            }
            return NotFound();

        }

    }
}
