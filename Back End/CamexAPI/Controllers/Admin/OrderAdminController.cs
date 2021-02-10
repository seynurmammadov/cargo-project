using Business.Abstract;
using CamexAPI.Identity;
using Entity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class OrderAdminController : ControllerBase
    {
        private readonly IOrderService _orderContext;
        public OrderAdminController(IOrderService orderContext)
        {
            _orderContext = orderContext;
        }
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                List<Order> orders = _orderContext.GetAllActive(id);
                return Ok(orders);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
