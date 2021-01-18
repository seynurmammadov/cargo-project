using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Models.VM
{
    public class RegisterVM
    {
        public List<Office> Offices { get; set; }
        public List<City> Cities { get; set; }
    }
}
