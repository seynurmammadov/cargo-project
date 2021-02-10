using Business.Abstract;
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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderContext;
        private readonly IStatusService _statusContext;
        private readonly MyIdentityDbContext _user;
        public OrderController(IOrderService orderContext
            , MyIdentityDbContext user, IStatusService statusContext)
        {
            _orderContext = orderContext;
            _statusContext = statusContext;
            _user = user;
        }
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            try
            {
                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).FirstOrDefault();
                List<Order> orders = _orderContext.GetAllActiveWithUserId(user.Id);
                return Ok(orders);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromForm] Order order)
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

                AppUser user = _user.Users.Where(u => u.UserName == User.Identity.Name).FirstOrDefault();
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
                order.IsActived = true;
                order.UserId = user.Id;
                order.StatusId = _statusContext.GetWithStatement("inProcess").Id;
                _orderContext.Add(order);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

    }
}
