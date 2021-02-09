using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin.Models
{
    public class UpdateUserBusiness
    {
        public string CheckPassword { get; set; }
        public string Password { get; set; }
        public string CurrentPassword { get; set; }
        public int CityId { get; set; }
        public int OfficeId { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyName { get; set; }
    }
}
