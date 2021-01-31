using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Models.VM
{
    public class UserNavVM
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string CompanyName { get; set; }
        public decimal UserBalance { get; set; }

    }
}
