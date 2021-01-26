using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Controllers.Admin.Models
{
    public class UserAdminVM
    {
        public string Id { get; set; }
        public int CamexId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActived { get; set; }
        public IList<string> Roles { get; set; }
    }
}
