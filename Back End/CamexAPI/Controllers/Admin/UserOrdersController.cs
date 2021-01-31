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


namespace CamexAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserOrdersController : ControllerBase
    {
        private readonly MyIdentityDbContext _user;
        private readonly IOrderService _orderContext;
        private readonly IStatusService _statusContext;
        public UserOrdersController(MyIdentityDbContext user,IOrderService orderContext, IStatusService statusContext)
        {
            _user = user;
            _orderContext = orderContext;
            _statusContext = statusContext;
        }
        // GET: api/<UserController>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var user = _user.Users.Where(u => u.CamexId == id)
                    .Include(u => u.Orders).ThenInclude(r => r.Receipt)
                    .Include(u => u.Orders).ThenInclude(c => c.Country)
                    .Include(u => u.Orders).ThenInclude(s => s.Status)
                    .Select(p => new{
                        p.CamexId,
                        Orders = p.Orders.Where(o => !o.IsDeleted),
                    })
                    .FirstOrDefault();
                if(user == null)
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
                return Ok(user);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Refuse(int id, [FromForm] int ReceiptID)
        {
            try
            {
                AppUser user = _user.Users.Where(u => u.CamexId == id).Include(u => u.Balance).Include(r => r.Receipts).FirstOrDefault();
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

                Receipt receipt = user.Receipts.Where(r => r.Id == ReceiptID).FirstOrDefault();
                if (receipt == null) return StatusCode(StatusCodes.Status500InternalServerError, new Response
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

                user.Balance.UserBalance += receipt.Value;
                user.Balance.ModifiedDate = DateTime.Now;

                user.Receipts.Add(new Receipt
                {
                    Name = "Refuse",
                    Value = receipt.Value,
                    IsActived = true
                }); ;
                _user.Update(user);
                _user.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut("refuse/{id}")]
        public IActionResult Refuse(int id)
        {
            try
            {
                Order order = _orderContext.GetWithId(id);
                if(order== null)
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
                order.IsDeleted = true;
                order.IsActived = false;
                order.ModifiedDate = DateTime.Now;
                order.StatusId = _statusContext.GetWithStatement("Refused").Id;
                _orderContext.Update(order);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut("changeStatus/{id}")]
        public IActionResult ChangeStatus(int id)
        {
            try
            {
                Order order = _orderContext.GetWithId(id);
                if (order == null)
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

                order.ModifiedDate = DateTime.Now;
                order.StatusId = _statusContext.GetWithStatement("Processed").Id;
                _orderContext.Update(order);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
