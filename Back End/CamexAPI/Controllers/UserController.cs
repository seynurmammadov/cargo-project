using BackProject.Helpers;
using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models.VM;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
        public readonly UserManager<AppUser> _userManager;
        public readonly IPrivateCustomerService _privateContext;
        public readonly IBusinessCustomerService _businesContext;
        public UserController(MyIdentityDbContext user, UserManager<AppUser> userManager, IPrivateCustomerService privateContext, IBusinessCustomerService businesContext)
        {
            _privateContext = privateContext;
            _user = user;
            _businesContext = businesContext;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                AppUser user = _user.Users
                    .Where(u => u.UserName == User.Identity.Name)
                    .Include(u => u.Balance)
                    .Include(u => u.Receipts)
                    .Where(u=>u.Receipts.Any(r=>r.IsActived)).FirstOrDefault();
               
                var roles = await _userManager.GetRolesAsync(user);

                foreach (var role in roles)
                {
                    if (role == Helper.Roles.PrivateCustomer.ToString())
                    {

                        PrivateCustomer customer = _privateContext.GetWithCamexId(user.CamexId);
                        UserVm userVm = new UserVm
                        {
                            User = user,
                            PrivateCustomer = customer,
                            BusinessCustomer = null
                        };
                        return Ok(userVm);
                    }
                    else if(role == Helper.Roles.BusinessCustomer.ToString())
                    {
                        BusinessCustomer customer = _businesContext.GetWithCamexId(user.CamexId);
                        UserVm userVm = new UserVm
                        {
                            User = user,
                            PrivateCustomer = null,
                            BusinessCustomer = customer
                        };
                        return Ok(userVm);
                    }
                }

             
                return NotFound();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

    }
}
