using Business.Abstract;
using Entity.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamexAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageService _languageContext;
        public LanguageController(ILanguageService languageContext)
        {
            _languageContext = languageContext;
        }
        [HttpGet]
        public List<Language> Get()
        {
            return _languageContext.GetAll();
        }
    }
}
