using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Office : IEntity
    {
        public int Id { get; set; }
        public int PriceValue { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<OfficeNameTranlate> OfficeNameTranlates { get; set; }
        public ICollection<AppUser> Users { get; set; }
    }
}
