using BackProject.Helpers;
using Business.Abstract;
using CamexAPI.Controllers.Admin.Models;
using CamexAPI.Identity;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin
{


    [Route("api/[controller]")]
    [ApiController]/*
    [Authorize(Roles = "Admin,MainAdmin")]*/
    public class UsersController : Controller
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly MyIdentityDbContext _userDbContext;
        private readonly IPrivateCustomerService _privateContext;
        private readonly IBusinessCustomerService _businessContext;
        public UsersController(UserManager<AppUser> userManager, IBusinessCustomerService businessContext, IPrivateCustomerService privateContext,RoleManager<IdentityRole> roleManager, MyIdentityDbContext userDbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _userDbContext = userDbContext;
            _privateContext = privateContext;
            _businessContext = businessContext;
        }

        // GET: UsersController
        [Route("get")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<AppUser> appUsers = _userManager.Users.OrderByDescending(u=>u.Id).Take(30).ToList();
                List<UserAdminVM> userVMs = new List<UserAdminVM>();
                foreach (AppUser user in appUsers)
                {
                    UserAdminVM userVM = new UserAdminVM()
                    {
                        Id = user.Id,
                        CamexId = user.CamexId,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        IsActived = user.IsActived,
                        Roles = await _userManager.GetRolesAsync(user)
                    };
                    userVMs.Add(userVM);
                }
                return Ok(userVMs);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Route("get-private")]
        [HttpGet]
        public IActionResult Private(string id)
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
                AppUser appUser = _userDbContext.Users.Where(u => u.Id == id)
                    .Include(u=>u.City).ThenInclude(c=>c.CityNameTranslates)
                    .Include(u=>u.Balance)
                    .Include(u=>u.Office).ThenInclude(o => o.OfficeNameTranlates).FirstOrDefault();
                if (appUser == null) return StatusCode(StatusCodes.Status404NotFound);
                PrivateCustomer customer = _privateContext.GetWithCamexId(appUser.CamexId);
                if (customer == null) return StatusCode(StatusCodes.Status404NotFound);
                return Ok(
                    new PrivateUserAdmin
                    {
                        User = appUser,
                        PrivateCustomer = customer
                    });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Route("get-business")]
        [HttpGet]
        public IActionResult Business(string id)
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
                AppUser appUser = _userDbContext.Users.Where(u => u.Id == id)
                    .Include(u => u.City).ThenInclude(c => c.CityNameTranslates)
                    .Include(u => u.Balance)
                    .Include(u => u.Office).ThenInclude(o => o.OfficeNameTranlates).FirstOrDefault();
                if (appUser == null) return StatusCode(StatusCodes.Status404NotFound);
                BusinessCustomer customer = _businessContext.GetWithCamexId(appUser.CamexId);
                if (customer == null) return StatusCode(StatusCodes.Status404NotFound);
                return Ok(
                    new BusinessUserAdmin
                    {
                        User = appUser,
                        BusinessCustomer = customer
                    });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Route("status")]
        [HttpPost]
        public async Task<IActionResult> Status([FromBody] StringType str)
        {
            string id = str.str;
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

                AppUser user = await _userManager.FindByIdAsync(id);
                if (user == null) return StatusCode(StatusCodes.Status404NotFound);
                IList<string> roles = await _userManager.GetRolesAsync(user);
                foreach (string role in roles)
                {
                    if (role == Helper.Roles.MainAdmin.ToString()) return StatusCode(StatusCodes.Status404NotFound,
                         new Response
                         {
                             Status = "Error",
                             Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="You cant change Main admin status!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Вы не можете поменять статус главного администратора!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Baş administratorun statusun dəyişə bilmərsiz!"
                            }
                        }
                         });
                }
                if (User.Identity.Name == user.UserName) return StatusCode(StatusCodes.Status404NotFound);

                if (User.IsInRole("Admin"))
                {
                    foreach (string role in roles)
                    {
                        if (role == Helper.Roles.Admin.ToString()) return StatusCode(StatusCodes.Status404NotFound,
                            new Response
                            {
                                Status = "Error",
                                Messages = new Message[] {
                                new Message {
                                    Lang_id = 1,
                                    MessageLang="You cant change admin status! Only Main Admin can change Admin status"
                                },
                                new Message {
                                    Lang_id = 2,
                                    MessageLang="Вы не можете поменять статус администратора это может сделать только главный администратор!"
                                },
                                new Message {
                                    Lang_id = 3,
                                    MessageLang="Administratorun statusun dəyişə bilmərsiz, bunu ancaq baş administrator ede bilər!"
                                }
                            }
                        });
                    }
                }


                user.IsActived = !user.IsActived;
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message );
            }

        }

        [Route("get-roles")]
        [HttpGet]
        public IActionResult GetRoles()
        {
            try
            {
               List<string> roles=  _roleManager.Roles.Select(r=>r.Name.ToString()).ToList();
                roles.Remove(Helper.Roles.PrivateCustomer.ToString());
                roles.Remove(Helper.Roles.BusinessCustomer.ToString());
                roles.Remove(Helper.Roles.MainAdmin.ToString());
                return Ok(roles);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Route("change-roles")]
        [HttpPost]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRole changeRole)
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
                
                foreach (string role in changeRole.Roles)
                {
                    if (!await _roleManager.RoleExistsAsync(role) || role==Helper.Roles.MainAdmin.ToString())
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Role does not exist!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Роль не существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Rol mövcud deyil!"
                            }
                        }
                    });
                }
                AppUser user = await _userManager.FindByIdAsync(changeRole.Id);
                if (user == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                             new Message {
                                Lang_id = 1,
                                MessageLang="User does not exist!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь не существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Istifadəci mövcud deyil!"
                            }
                        }
                    });
                if(!User.IsInRole(Helper.Roles.MainAdmin.ToString()))
                 if (User.Identity.Name == user.UserName)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                             new Message {
                                Lang_id = 1,
                                MessageLang="You can't change your role!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Вы не можете изменить свою роль!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Rolunuzu dəyişdirə bilməzsiniz!"
                            }
                        }
                    });

                IList<string> db_roles = await _userManager.GetRolesAsync(user);
                foreach (string db_role in db_roles)
                {
                    if (!User.IsInRole(Helper.Roles.MainAdmin.ToString()))
                    {
                        if (db_role == Helper.Roles.MainAdmin.ToString())
                            return StatusCode(StatusCodes.Status404NotFound,
                                 new Response
                                 {
                                     Status = "Error",
                                     Messages = new Message[] {
                                new Message {
                                    Lang_id = 1,
                                    MessageLang="You cant change Main admin role!"
                                },
                                new Message {
                                    Lang_id = 2,
                                    MessageLang="Вы не можете поменять роль главного администратора!"
                                },
                                new Message {
                                    Lang_id = 3,
                                    MessageLang="Baş administratorun rolun dəyişə bilmərsiz!"
                                }
                                 }
                                 });
                        if (User.IsInRole(Helper.Roles.Admin.ToString()))
                        {
                            if (db_role == Helper.Roles.Admin.ToString())
                            {
                                return StatusCode(StatusCodes.Status404NotFound,
                                   new Response
                                   {
                                       Status = "Error",
                                       Messages = new Message[] {
                                    new Message {
                                        Lang_id = 1,
                                        MessageLang="You cant change admin role! Only Main Admin can change Admin roles"
                                    },
                                    new Message {
                                        Lang_id = 2,
                                        MessageLang="Вы не можете поменять роль администратора это может сделать только главный администратор!"
                                    },
                                    new Message {
                                        Lang_id = 3,
                                        MessageLang="Administratorun rolun dəyişə bilmərsiz, bunu ancaq baş administrator ede bilər!"
                                    }
                                   }
                                   });
                            }
                        }
                    }
                }
                db_roles.Remove(Helper.Roles.PrivateCustomer.ToString());
                db_roles.Remove(Helper.Roles.BusinessCustomer.ToString());
                db_roles.Remove(Helper.Roles.MainAdmin.ToString());
                IdentityResult identityResult = await _userManager.RemoveFromRolesAsync(user, db_roles);
                if (!identityResult.Succeeded)
                {
                    return StatusCode(StatusCodes.Status404NotFound,
                             new Response
                             {
                                 Status = "Error",
                                 Messages = new Message[] {
                                new Message {
                                    Lang_id = 1,
                                    MessageLang="Roles does not removed!"
                                },
                                new Message {
                                    Lang_id = 2,
                                    MessageLang="Роли не удалены!"
                                },
                                new Message {
                                    Lang_id = 3,
                                    MessageLang="Rollar pozulmadı!"
                                }
                             }
                             });
                }

                IdentityResult identityResultNew = await _userManager.AddToRolesAsync(user, changeRole.Roles);
                if (!identityResultNew.Succeeded)
                {
                    return StatusCode(StatusCodes.Status404NotFound,
                             new Response
                             {
                                 Status = "Error",
                                 Messages = new Message[] {
                                new Message {
                                    Lang_id = 1,
                                    MessageLang="Roles does not added" +
                                    "!"
                                },
                                new Message {
                                    Lang_id = 2,
                                    MessageLang="Роли не добавлены!"
                                },
                                new Message {
                                    Lang_id = 3,
                                    MessageLang="Rollar əlavə olunmadı!"
                                }
                             }
                             });
                }
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

           
        }

        [Route("reset-password")]
        [HttpPost]
        public async Task<IActionResult> ResetPassword([FromBody] ChangePassword changePassword)
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
                AppUser user = await _userManager.FindByIdAsync(changePassword.Id);
                if (user == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                             new Message {
                                Lang_id = 1,
                                MessageLang="User does not exist!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь не существует!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Istifadəci mövcud deyil!"
                            }
                        }
                    });

                IList<string> roles = await _userManager.GetRolesAsync(user);
                foreach (string role in roles)
                {
                    if (role == "MainAdmin" && User.Identity.Name != user.UserName) return StatusCode(StatusCodes.Status404NotFound,
                                new Response
                                {
                                    Status = "Error",
                                    Messages = new Message[] {
                                new Message {
                                    Lang_id = 1,
                                    MessageLang="You cant reset Main admin password!"
                                },
                                new Message {
                                    Lang_id = 2,
                                    MessageLang="Вы не можете сбросить пароль главного администратора!"
                                },
                                new Message {
                                    Lang_id = 3,
                                    MessageLang="Baş administratorun şifrısin dəyişə bilmərsiz!"
                                }
                                }
                                });

                    if (User.IsInRole("Admin"))
                    {
                        if (role == "Admin" && User.Identity.Name != user.UserName)
                        {
                            return StatusCode(StatusCodes.Status404NotFound,
                                    new Response
                                    {
                                        Status = "Error",
                                        Messages = new Message[] {
                                    new Message {
                                        Lang_id = 1,
                                        MessageLang="You cant reset admin password! Only Main Admin can do this."
                                    },
                                    new Message {
                                        Lang_id = 2,
                                        MessageLang="Вы не можете поменять пароль администратора это может сделать только главный администратор!"
                                    },
                                    new Message {
                                        Lang_id = 3,
                                        MessageLang="Administratorun şifrəsin dəyişə bilmərsiz, bunu ancaq baş administrator edə bilər!"
                                    }
                                    }
                                    });
                        }
                    }
                }

                string token = await _userManager.GeneratePasswordResetTokenAsync(user);
                IdentityResult identityResult = await _userManager.ResetPasswordAsync(user, token, changePassword.Password);
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
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("search/{id}")]

        public async Task<IActionResult> Search(int id)
        {
            try
            {
                List<AppUser> users = _userManager.Users.Where(u=>u.CamexId.ToString().Contains(id.ToString())).ToList();
                if (users == null)
                    return StatusCode(StatusCodes.Status404NotFound, new Response
                    {
                        Status = "Error",
                        Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="User is not found!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Пользователь не найден!"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Istifadəçi tapılmadı!"
                            }
                        }
                    });
                List<UserAdminVM> userVMs = new List<UserAdminVM>();
                foreach (AppUser user in users)
                {
                    UserAdminVM userVM = new UserAdminVM()
                    {
                        Id = user.Id,
                        CamexId = user.CamexId,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        IsActived = user.IsActived,
                        Roles = await _userManager.GetRolesAsync(user)
                    };
                    userVMs.Add(userVM);
                }
                return Ok(userVMs);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
