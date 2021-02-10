using Business.Abstract;
using CamexAPI.Models;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StatusController : ControllerBase
    {
        private readonly IStatusService _statusContext;
        private readonly ICargoService _cargoContext;
        public StatusController(IStatusService statusContext, ICargoService cargoContext)
        {
            _statusContext = statusContext;
            _cargoContext = cargoContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            try
            {
                List<Status> statuses = _statusContext.GetAll();
                statuses = statuses.Where(s => s.Name != "Statement" && s.Name != "InProcess" && s.Name != "Processed" && s.Name != "Refused"&& s.Name!= "WaitingInvoice").ToList();
                return Ok(statuses);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
             [HttpPut("{id}")]
    public  IActionResult PutAsync(int id, [FromForm] int parcelId)
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
            Cargo db_cargo = _cargoContext.GetWithId(parcelId);
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
            db_cargo.StatusId = id;
            db_cargo.ModifiedDate = DateTime.Now;
            _cargoContext.Update(db_cargo);
            return Ok();

        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }
    }
}
