using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Models
{
    public class PrivateCustomer : IEntity
    {
        public int Id { get; set; }
        public int CamexId { get; set; }
        public int PassportNumber { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Lastname { get; set; }
        public DateTime Birthday { get; set; }
        public int CitizenshipId { get; set; }
        public virtual Citizenship Citizenship { get; set; }
        public string FINCode { get; set; }
        public bool IsMan { get; set; }

    }
}
