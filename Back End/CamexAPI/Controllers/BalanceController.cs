using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceController : ControllerBase
    {
        private readonly MyIdentityDbContext _user;
        private readonly ICargoService _cargoContext;
        public BalanceController(MyIdentityDbContext user, ICargoService cargoContext)
        {
            _user = user;
            _cargoContext = cargoContext;
        }
        [HttpPut]
        [Route("add")]
        public IActionResult Put([FromForm] decimal balance)
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

                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).Include(u=>u.Balance).Include(r=>r.Receipts).FirstOrDefault();
                if (user == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
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
                user.Balance.UserBalance += balance;
                user.Balance.ModifiedDate = DateTime.Now;

                user.Receipts.Add(new Receipt { 
                    Name="plus",
                    Value= balance,
                    IsActived=true
                });;
                _user.Update(user);
                _user.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut]
        [Route("remove")]
        public  IActionResult PutRemove([FromForm] decimal total)
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

                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).Include(u => u.Balance).Include(r => r.Receipts).FirstOrDefault();
                if (user == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
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
                decimal rezerv = user.Balance.UserBalance;
                rezerv -= Math.Abs(total);
                if(rezerv<0) return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
                    Messages = new Message[] {
                            new Message {
                                Lang_id = 1,
                                MessageLang="Insufficient funds! Please top up your balance!"
                            },
                            new Message {
                                Lang_id = 2,
                                MessageLang="Недостаточно средств! Пожалуйста пополните баланс"
                            },
                            new Message {
                                Lang_id = 3,
                                MessageLang="Kifayyət gədər vəsait yoxdur! Zəhmət olmasa balansınızı artırın!"
                            }
                        }
                });
                user.Balance.UserBalance = rezerv;
                user.Balance.ModifiedDate = DateTime.Now;

                user.Receipts.Add(new Receipt
                {
                    Name = "minus",
                    Value = total,
                    IsActived = true
                }); ;
                _user.Update(user);
                _user.SaveChanges();
                return Ok(user.Receipts.OrderByDescending(x => x.Id).FirstOrDefault().Id);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut("status/{id}")]
        public IActionResult Status( int id)
        {
            try
            {
                Cargo cargo = _cargoContext.GetWithId(id);

                if (cargo == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
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
                cargo.PaymentStatus = true;
                _cargoContext.Update(cargo);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
