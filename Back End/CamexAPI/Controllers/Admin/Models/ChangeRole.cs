using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin.Models
{
    public class ChangeRole
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string[] Roles { get; set; }
    }
}
