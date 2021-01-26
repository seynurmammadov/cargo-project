using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin.Models
{
    public class ChangePassword
    {
        [Required]
        public string Id { get; set; }
        [Required, DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
