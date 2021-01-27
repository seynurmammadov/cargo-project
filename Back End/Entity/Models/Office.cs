using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Office : IEntity
    {
        public int Id { get; set; }
        [Required]
        public float PriceValue { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<OfficeNameTranslate> OfficeNameTranlates { get; set; }
        public ICollection<AppUser> Users { get; set; }
    }
}
