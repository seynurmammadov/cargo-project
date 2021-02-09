using BackProject.Helpers;
using Business.Abstract;
using CamexAPI.Controllers.Admin.Models;
using CamexAPI.Identity;
using CamexAPI.Models;
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
        private readonly ICityService _cityContext;
        private readonly IOfficeService _officeContext;
        public UserController(MyIdentityDbContext user, IOfficeService officeContext, ICityService cityContext, UserManager<AppUser> userManager, IPrivateCustomerService privateContext, IBusinessCustomerService businesContext)
        {
            _privateContext = privateContext;
            _user = user;
            _businesContext = businesContext;
            _userManager = userManager;
            _cityContext = cityContext;
            _officeContext = officeContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                AppUser user = _user.Users
                    .Where(u => u.UserName == User.Identity.Name)
                    .Include(u => u.Balance)
                    .Include(u => u.Receipts).FirstOrDefault();
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

        [HttpPut]
        [Route("private")]
        public async Task<IActionResult> RegisterPrivate([FromForm] UpdateUserPrivate privateUser)
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

              

                City city = _cityContext.GetWithId(privateUser.CityId);
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

                Office office = _officeContext.GetWithId(privateUser.OfficeId);
                if (office == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
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

                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).FirstOrDefault();

                if (privateUser.CurrentPassword != null)
                {
                    if (await _userManager.CheckPasswordAsync(user, privateUser.CurrentPassword))
                    {
                        string token = await _userManager.GeneratePasswordResetTokenAsync(user);
                        IdentityResult identityResult = await _userManager.ResetPasswordAsync(user, token, privateUser.Password);
                        if (!identityResult.Succeeded)
                        {
                            return StatusCode(StatusCodes.Status404NotFound,
                                new Response
                                {
                                    Status = "Error",
                                    Messages = new Message[] {
                        new Message {
                            Lang_id = 1,
                            MessageLang="The password does not match the validation rules!"
                        },
                        new Message {
                            Lang_id = 2,
                            MessageLang="Пароль не соответствует правилам валидации!"
                        },
                        new Message {
                            Lang_id = 3,
                            MessageLang="Şifrə validasiya qaydalarına uyğun deyil!"
                        }
                                }
                                });
                        }
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response
                        {
                            Status = "Error",
                            Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Password not valid!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пароль не действителен!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Şifrə düzgün deyil!"
                            }
                        }
                        });
                    }
                }
                user.Address = privateUser.Address;
                user.CityId = privateUser.CityId;
                user.PhoneNumber = privateUser.PhoneNumber;
                user.OfficeId = privateUser.OfficeId;
                _user.SaveChanges();
                PrivateCustomer privateC = _privateContext.GetWithCamexId(user.CamexId);
                privateC.Birthday = privateUser.Birthday;
                privateC.IsMan = privateUser.IsMan;
                _privateContext.Update(privateC);

                return Ok(new Response
                {
                    Status = "Success",
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
                return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
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

        [HttpPut]
        [Route("business")]
        public async Task<IActionResult> RegisterBusiness([FromForm] UpdateUserBusiness businessUser)
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
                if (office == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
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

                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).FirstOrDefault();

                if (businessUser.CurrentPassword != null)
                {
                    if (await _userManager.CheckPasswordAsync(user, businessUser.CurrentPassword))
                    {
                        string token = await _userManager.GeneratePasswordResetTokenAsync(user);
                        IdentityResult identityResult = await _userManager.ResetPasswordAsync(user, token, businessUser.Password);
                        if (!identityResult.Succeeded)
                        {
                            return StatusCode(StatusCodes.Status404NotFound,
                                new Response
                                {
                                    Status = "Error",
                                    Messages = new Message[] {
                        new Message {
                            Lang_id = 1,
                            MessageLang="The password does not match the validation rules!"
                        },
                        new Message {
                            Lang_id = 2,
                            MessageLang="Пароль не соответствует правилам валидации!"
                        },
                        new Message {
                            Lang_id = 3,
                            MessageLang="Şifrə validasiya qaydalarına uyğun deyil!"
                        }
                                }
                                });
                        }
                    }
                    else
                    {
                            return StatusCode(StatusCodes.Status500InternalServerError, new Response
                            {
                                Status = "Error",
                                Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Password not valid!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пароль не действителен!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Şifrə düzgün deyil!"
                            }
                        }
                      });
                    }
                }
                user.Address = businessUser.Address;
                user.CityId = businessUser.CityId;
                user.PhoneNumber = businessUser.PhoneNumber;
                user.OfficeId = businessUser.OfficeId;
                _user.SaveChanges();
                BusinessCustomer business = _businesContext.GetWithCamexId(user.CamexId);
                business.CompanyName = businessUser.CompanyName;
                _businesContext.Update(business);
                return Ok(new Response
                {
                    Status = "Success",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User updated successfully!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь успешно изменен!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="İstifadəçi uğurla dəyişildi!"
                            }
                        }
                });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
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


    }
}
