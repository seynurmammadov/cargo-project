
using BackProject.Extentions;
using BackProject.Helpers;
using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IPrivateCustomerService _customerDAL;
        private readonly MyIdentityDbContext _userDbContext;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthController(
            UserManager<AppUser> userManager,
            IConfiguration configuration,
            IPrivateCustomerService customerDAL,
            MyIdentityDbContext userDbContext,
            RoleManager<IdentityRole> roleManager
            )
        {
            _userManager = userManager;
            _configuration = configuration;
            _customerDAL = customerDAL;
            _userDbContext = userDbContext;
            _roleManager = roleManager;
        }

/*        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }*/

        [HttpPost]
        [Route("register-private")]
        public async Task<IActionResult> RegisterPrivate([FromBody] RegisterPrivate privateUser)
        {

            if (User.Identity.IsAuthenticated) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User Is Authenticated!" });

            if (!ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Model state isn't valid!" });
            }
            var userExists = await _userManager.FindByEmailAsync(privateUser.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

                
            var privateUserDb = _userDbContext.Users.Where(u => u.PhoneNumber == privateUser.PhoneNumber).FirstOrDefault();
            if (privateUserDb != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            int camexId = _userDbContext.Users.OrderByDescending(u => u.CamexId).FirstOrDefault().CamexId + 1;
            bool isAdded = _customerDAL.Add(new PrivateCustomer
            {
                CamexId = camexId,
                PassportNumber = privateUser.PassportNumber,
                Name = privateUser.Name,
                Surname = privateUser.Surname,
                Lastname = privateUser.Lastname,
                Birthday = privateUser.Birthday,
                СitizenshipId = privateUser.СitizenshipId,
                FINCode = privateUser.FINCode,
                IsMan = privateUser.IsMan,
            });
            if (!isAdded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            AppUser user = new AppUser()
            {
                UserName = privateUser.Name + privateUser.Surname + privateUser.FINCode,
                Email = privateUser.Email,
                PhoneNumber = privateUser.PhoneNumber,
                CamexId = camexId,
                CityId = privateUser.CityId,
                Address = privateUser.Address,
                OfficeId = privateUser.OfficeId,
                Image = "placeholder.jpg",
                IsTermsAccepted = privateUser.IsTermAccepted,
                IsActived = false,
            };

            user.Balance = new Balance
            {
                UserBalance = 0
            };

            IdentityResult identityResult = await _userManager.CreateAsync(user, privateUser.Password);
            await _userManager.AddToRoleAsync(user, Helper.Roles.PrivateCustomer.ToString());

            if (!identityResult.Succeeded)
            {
                string errors= ModelState.GetAllErrors(identityResult);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again."+"\n Errors: \n"+errors });

            }
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });

        }
     /*   [HttpGet]
        [Route("CreateRole")]
        public async Task CreateRole()
        {
            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole()
                {
                    Name = "Admin"
                });
            if (!await _roleManager.RoleExistsAsync("PrivateCustomer"))
            {
                await _roleManager.CreateAsync(new IdentityRole()
                {
                    Name = "PrivateCustomer"
                });
            }
            if (!await _roleManager.RoleExistsAsync("BusinessCustomer"))
            {
                await _roleManager.CreateAsync(new IdentityRole()
                {
                    Name = "BusinessCustomer"
                });
            }
            if (!await _roleManager.RoleExistsAsync("Moderator"))
            {
                await _roleManager.CreateAsync(new IdentityRole()
                {
                    Name = "Moderator"
                });
            }
            if (!await _roleManager.RoleExistsAsync("MainAdmin"))
            {
                await _roleManager.CreateAsync(new IdentityRole()
                {
                    Name = "MainAdmin"
                });
            }

        }*/
    }
}
