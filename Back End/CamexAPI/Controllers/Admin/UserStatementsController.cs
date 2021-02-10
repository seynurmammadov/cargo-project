using Business.Abstract;
using CamexAPI.Identity;
using CamexAPI.Models;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class UserStatementsController : ControllerBase
    {
        private readonly MyIdentityDbContext _user;
        private readonly IStatusService _statusContext;

        public UserStatementsController(MyIdentityDbContext user, IStatusService statusContext)
        {
            _user = user;
            _statusContext = statusContext;
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            try
            {
                var user = _user.Users.Where(u => u.CamexId == id)
                    .Include(u => u.Cargos).ThenInclude(o => o.Product).ThenInclude(t=>t.ProductTranslates)
                    .Include(u => u.Cargos).ThenInclude(s => s.Status)
                    .Select(p => new {
                        Cargos = p.Cargos.Where(o => !o.IsDeleted && o.Status.Name=="Statement"),
                    })
                    .FirstOrDefault();
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
                return Ok(user.Cargos);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
