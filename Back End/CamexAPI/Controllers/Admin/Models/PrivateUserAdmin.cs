using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin
{
    public class PrivateUserAdmin
    {
        public AppUser User { get; set; }
        public PrivateCustomer PrivateCustomer { get; set; }
    }
}
