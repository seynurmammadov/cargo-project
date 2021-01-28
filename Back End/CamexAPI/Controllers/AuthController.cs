    
using BackProject.Extentions;
using BackProject.Helpers;
using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Infrastructure;
using CamexAPI.Models;
using CamexAPI.Models.VM;
using Entity.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly MyIdentityDbContext _userDbContext;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IPrivateCustomerService _privateContext;
        private readonly ICitizenshipService _citizenshipContext;
        private readonly ICityService _cityContext;
        private readonly IOfficeService _officeContext;
        private readonly IBalanceService _balanceContext;
        private readonly IBusinessCustomerService _businessContext;
        private readonly IJwtAuthManager _jwtAuthManager;

        public AuthController(
            UserManager<AppUser> userManager,
            IConfiguration configuration,
            MyIdentityDbContext userDbContext,
            RoleManager<IdentityRole> roleManager,
            IPrivateCustomerService privateContext,
            ICitizenshipService citizenshipContext,
            ICityService cityContext,
            IOfficeService officeContext,
            IBalanceService balanceContext,
            IBusinessCustomerService businessContext,
            IJwtAuthManager jwtAuthManager
            )
        {
            _userManager = userManager;
            _configuration = configuration;
            _privateContext = privateContext;
            _userDbContext = userDbContext;
            _roleManager = roleManager;
            _citizenshipContext = citizenshipContext;
            _cityContext = cityContext;
            _officeContext = officeContext;
            _balanceContext = balanceContext;
            _businessContext = businessContext;
            _jwtAuthManager = jwtAuthManager;
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("register")]
        public RegisterVM Register()
        {
            List<City> cities = _cityContext.GetAllActive();
            List<Office> offices = _officeContext.GetAllActive();
            return new RegisterVM { Cities = cities, Offices = offices };
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register-private")]
        public async Task<IActionResult> RegisterPrivate([FromBody] RegisterPrivate privateUser)
        {
            try
            {
                if (User.Identity.IsAuthenticated) return StatusCode(StatusCodes.Status500InternalServerError, 
                    new Response { 
                        Status = "Error",
                        Messages = new Message[] {
                            new Message { 
                                Lang_id = 1,
                                MessageLang="User Is Authenticated!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь уже вошел в систему!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçi artıq daxil olub!"
                            }
                        }
                    });

                if (!ModelState.IsValid)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
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

                if (privateUser.IsTermsAccepted == false)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User should access terms!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь должен принять условия!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçi şərtlərini gəbul etməlidir!"
                            }
                        }
                    });

                var userExists = await _userManager.FindByEmailAsync(privateUser.Email);
                if (userExists != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            }
                        }
                    });

                var privateUserDb = _userDbContext.Users.Where(u => u.PhoneNumber == privateUser.PhoneNumber).FirstOrDefault();
                if (privateUserDb != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            }
                        }
                    });

                PrivateCustomer customer = _privateContext.GetWithFIN(privateUser.FINCode);
                if (customer != null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            }
                        }
                });

                customer = _privateContext.GetWithPassportNumber(privateUser.PassportNumber);
                if (customer != null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            }
                        }
                });

                Citizenship сitizenship = _citizenshipContext.GetWithId(privateUser.CitizenshipId);
                if (сitizenship == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Citizenship isn't correct!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Гражданство выбрано неправильно!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Vətəndaşlıq düzgün seçilməyib!"
                            }
                        }
                });

                City city = _cityContext.GetWithId(privateUser.CityId);
                if (city == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="City isn't correct!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Город выбран неправильно!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Vətəndaşlıq düzgün seçilməyib!"
                            }
                        }
                });

                Office office = _officeContext.GetWithId(privateUser.OfficeId);
                if (office == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Office isn't correct!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Офис выбран неправильно!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Ofis düzgün seçilməyib!"
                            }
                        }
                });

                int camexId = _userDbContext.Users.OrderByDescending(c=>c.CamexId).FirstOrDefault().CamexId+1;


                AppUser user = new AppUser()
                {
                    UserName = String.Concat(privateUser.Name.Where(c => !Char.IsWhiteSpace(c))) + String.Concat(privateUser.Surname.Where(c => !Char.IsWhiteSpace(c)))  + Guid.NewGuid(),
                    Email = privateUser.Email,
                    PhoneNumber = privateUser.PhoneNumber,
                    CamexId = camexId,
                    CityId = privateUser.CityId,
                    OfficeId = privateUser.OfficeId,
                    Address = privateUser.Address,
                    Image = "placeholder.jpg",
                    IsTermsAccepted = privateUser.IsTermsAccepted,
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
                    string errors = ModelState.GetAllErrors(identityResult);
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User creation failed! Please check user details and try again." + " Errors: " + errors
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Не удалось создать пользователя! Пожалуйста, проверьте данные пользователя и попробуйте еще раз." + " Errors: " + errors
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçini yaratmaq alınmadı! Xahiş edirik istifadəçi məlumatlarınızı yoxlayın və yenidən cəhd edin."+ " Errors: " + errors
                            }
                        }
                    });

                }
                _privateContext.Add(new PrivateCustomer
                {
                    CamexId = camexId,
                    PassportNumber = privateUser.PassportNumber,
                    Name = privateUser.Name,
                    Surname = privateUser.Surname,
                    Lastname = privateUser.Lastname,
                    Birthday = privateUser.Birthday,
                    CitizenshipId = privateUser.CitizenshipId,
                    FINCode = privateUser.FINCode,
                    IsMan = privateUser.IsMan,
                });
                return Ok(new Response { Status = "Success",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User created successfully!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь успешно создан!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçi uğurla yaradıldı!"
                            }
                        }
                });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang=e.Message + e.InnerException
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang=e.Message + e.InnerException

                            },
                            new Message {
                                Lang_id = 3,
                                 MessageLang=e.Message + e.InnerException
                            }
                        }
                });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register-business")]
        public async Task<IActionResult> RegisterBusiness([FromBody] RegisterBusiness businessUser)
        {
            try
            {
                if (User.Identity.IsAuthenticated) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User Is Authenticated!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь уже вошел в систему!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçi artıq daxil olub!"
                            }
                        }
                });

                if (!ModelState.IsValid)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
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

                if (businessUser.IsTermsAccepted == false)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User should access terms!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь должен принять условия!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçi şərtlərini gəbul etməlidir!"
                            }
                        }
                    });

                var userExists = await _userManager.FindByEmailAsync(businessUser.Email);
                if (userExists != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                         Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            } 
                         }
                        });

                var privateUserDb = _userDbContext.Users.Where(u => u.PhoneNumber == businessUser.PhoneNumber).FirstOrDefault();
                if (privateUserDb != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            }
                        }
                    
                    });

                BusinessCustomer customer = _businessContext.GetWithNumber(businessUser.CompanyRegistrationNumber);
                if (customer != null) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            }
                        }
                });
               
                 customer = _businessContext.GetWithName(businessUser.CompanyName);
                if (customer != null) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User already exists!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Такой пользователь уже существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Belə istifadəçi artıq mövcuddur!"
                            }
                        }
                });

                City city = _cityContext.GetWithId(businessUser.CityId);
                if (city == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="City isn't correct!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Город выбран неправильно!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Vətəndaşlıq düzgün seçilməyib!"
                            }
                        }
                });

                Office office = _officeContext.GetWithId(businessUser.OfficeId);
                if (office == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Office isn't correct!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Офис выбран неправильно!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Ofis düzgün seçilməyib!"
                            }
                        }
                });

                int camexId = _userDbContext.Users.OrderByDescending(c => c.CamexId).FirstOrDefault().CamexId + 1;


                AppUser user = new AppUser()
                {
                    UserName = String.Concat(businessUser.CompanyName.Where(c => !Char.IsWhiteSpace(c))) +Guid.NewGuid(),
                    Email = businessUser.Email,
                    PhoneNumber = businessUser.PhoneNumber,
                    CamexId = camexId,
                    CityId = businessUser.CityId,
                    OfficeId = businessUser.OfficeId,
                    Address = businessUser.Address,
                    Image = "placeholder.jpg",
                    IsTermsAccepted = businessUser.IsTermsAccepted,
                    IsActived = false,
                };

                user.Balance = new Balance
                {
                    UserBalance = 0
                };

                IdentityResult identityResult = await _userManager.CreateAsync(user, businessUser.Password);
                await _userManager.AddToRoleAsync(user, Helper.Roles.BusinessCustomer.ToString());

                if (!identityResult.Succeeded)
                {
                    string errors = ModelState.GetAllErrors(identityResult);
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User creation failed! Please check user details and try again." + " Errors: " + errors
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Не удалось создать пользователя! Пожалуйста, проверьте данные пользователя и попробуйте еще раз." + " Errors: " + errors
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçini yaratmaq alınmadı! Xahiş edirik istifadəçi məlumatlarınızı yoxlayın və yenidən cəhd edin."+ " Errors: " + errors
                            }
                        }
                    });

                }
                _businessContext.Add(new BusinessCustomer
                {
                    CamexId = camexId,
                    CompanyRegistrationNumber=businessUser.CompanyRegistrationNumber,
                    CompanyName=businessUser.CompanyName,
                });
                return Ok(new Response { Status = "Success",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User created successfully!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь успешно создан!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçi uğurla yaradıldı!"
                            }
                        }
                });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang=e.Message + e.InnerException
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang=e.Message + e.InnerException

                            },
                            new Message {
                                Lang_id = 3,
                                 MessageLang=e.Message + e.InnerException
                            }
                        }
                });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            try
            {
                AppUser user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    if (!user.IsActived)
                    {
                        return StatusCode(StatusCodes.Status401Unauthorized, new Response { Status = "Error",
                            Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Your account is Deactivatived! Please check your email and active account!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Ваш аккаунт деактивирован! Пожалуйста, проверьте свою электронную почту и активную учетную запись!"

                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Hesabınız activ deyil! Zəhmət olmasa e-poçtunuzu yoxlayın ve hesabınızı aktiv edin!"
                            }
                        }
                        });

                    }
                    IList<string> userRoles = await _userManager.GetRolesAsync(user);

                    List<Claim> authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                    };
                    List<string> Roles = new List<string> { };
                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                        Roles.Add(userRole);                    
                    }

                    var jwtResult = _jwtAuthManager.GenerateTokens(user.UserName, authClaims, DateTime.Now);

                    return Ok(new LoginResult
                    {
                        UserName = model.Email,
                        Roles = Roles,
                        AccessToken = jwtResult.AccessToken,
                        RefreshToken = jwtResult.RefreshToken.TokenString
                    });

                }
                return StatusCode(StatusCodes.Status401Unauthorized, new Response
                {
                    Status = "Error",
                    Messages = new Message[]
                    { 
                        new Message {Lang_id=1,MessageLang= "Email or Password is Wrong!" } ,
                        new Message {Lang_id=2,MessageLang= "Е-маил или пароль введены неправильно!" },
                        new Message {Lang_id=3,MessageLang= "E-poçt və ya şifrə düzgün yazılmayıb!" }
                    }
                        
                });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang=e.Message +" aaa"+ e.InnerException+e.StackTrace
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang=e.Message + e.InnerException

                            },
                            new Message {
                                Lang_id = 3,
                                 MessageLang=e.Message + e.InnerException
                            }
                        }
                });
            }
        }

        [HttpGet("user")]
        [Authorize]
        public ActionResult GetCurrentUser()
        {
            return Ok(new LoginResult
            {
                UserName = User.Identity.Name,
                Roles = User.FindAll(ClaimTypes.Role).Select(c=>c.Value.ToString()).ToList(),
                OriginalUserName = User.FindFirst("OriginalUserName")?.Value
            });
        }


        [HttpPost("logout")]
        [Authorize]
        public ActionResult Logout()
        {
            var userName = User.Identity.Name;
            _jwtAuthManager.RemoveRefreshTokenByUserName(userName);
            return Ok();
        }

        [HttpPost("refresh-token")]
        [Authorize] 
        public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrWhiteSpace(request.RefreshToken))
                {
                    return Unauthorized();
                }

                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
                var jwtResult = _jwtAuthManager.Refresh(request.RefreshToken, accessToken, DateTime.Now);
                return Ok(new LoginResult
                {
                    UserName = userName,
                    Roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value.ToString()).ToList(),
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken.TokenString
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message); // return 401 so that the client side can redirect the user to login page
            }
        }

        /*[HttpGet]
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
