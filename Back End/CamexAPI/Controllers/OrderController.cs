using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models;
using Entity.Models;
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
        private UserManager<AppUser> _userManager;
        private readonly MyIdentityDbContext _user;
        public OrderController(IOrderService orderContext, UserManager<AppUser> userManager
            , MyIdentityDbContext user, IStatusService statusContext)
        {
            _orderContext = orderContext;
            _userManager = userManager;
            _statusContext = statusContext;
            _user = user;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Order order)
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

      /*  // PUT api/<CountryController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromForm] Cargo cargo)
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
                Cargo db_cargo = _cargoContext.GetWithId(id);
                if (db_cargo == null)
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
                if (cargo.Photo != null)
                {
                    ValidateModel res = cargo.Photo.PhotoValidate();
                    if (!res.Success) return StatusCode(StatusCodes.Status500InternalServerError, res.Response);
                    string folder = Path.Combine("Site", "images", "statements");
                    string fileName = await cargo.Photo.SaveImage(_env.WebRootPath, folder);
                    db_cargo.Image = fileName;
                }

                db_cargo.Track = cargo.Track;
                db_cargo.Name = cargo.Name;
                db_cargo.ProductId = cargo.ProductId;
                db_cargo.Price = cargo.Price;
                db_cargo.CountryId = cargo.CountryId;
                db_cargo.Count = cargo.Count;
                db_cargo.Notice = cargo.Notice;
                db_cargo.ModifiedDate = DateTime.Now;
                _cargoContext.Update(db_cargo);
                return Ok();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }*/


/*
        // DELETE api/<CountryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Order db_order = _orderContext.GetWithId(id);
                if (db_order == null)
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
                db_order.IsDeleted = true;
                db_order.ModifiedDate = DateTime.Now;
                _orderContext.Update(db_order);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }*/
    }
}
