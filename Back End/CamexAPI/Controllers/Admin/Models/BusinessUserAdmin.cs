using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin.Models
{
    public class BusinessUserAdmin
    {
        public AppUser User { get; set; }
        public BusinessCustomer BusinessCustomer { get; set; }
    }
}
