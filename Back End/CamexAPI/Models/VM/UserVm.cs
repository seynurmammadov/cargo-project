using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Models.VM
{
    public class UserVm
    {
        public AppUser User { get; set; }
        public BusinessCustomer BusinessCustomer { get; set; }
        public PrivateCustomer PrivateCustomer { get; set; }
    }
}
