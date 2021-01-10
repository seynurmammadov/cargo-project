using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Models
{
    public class BusinessCustomer : IEntity
    {
        public int Id { get; set; }
        public int CamexId { get; set; }
        public int CompanyRegistrationNumber { get; set; }
        public string CompanyName { get; set; }
    }
}
