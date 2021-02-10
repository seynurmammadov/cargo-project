using CamexAPI.Identity;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResetController : ControllerBase
    {
        private readonly MyIdentityDbContext _user;
        public readonly UserManager<AppUser> _userManager;

        public ResetController(MyIdentityDbContext user, UserManager<AppUser> userManager)
        {
            _user = user;
            _userManager = userManager;
        }
        [HttpPut]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Forgot(string id,[FromForm] string NewPassword)
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
                AppUser user = _user.Users.Where(u => u.ActiveCode == id).FirstOrDefault();
                if (user == null)
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

                string token = await _userManager.GeneratePasswordResetTokenAsync(user);
                IdentityResult identityResult = await _userManager.ResetPasswordAsync(user, token, NewPassword);
                if (!identityResult.Succeeded)
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
                user.ActiveCode = null;
                await _user.SaveChangesAsync();
                return Ok();

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
