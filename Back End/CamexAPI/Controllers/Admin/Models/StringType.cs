using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin.Models
{
    public class StringType
    {
        [Required]
        public string str { get; set; }
    }
}
