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

        [Required]
        public string PhoneNumber { get; set; }
        [Required,EmailAddress]
        public string Email { get; set; }
        public string Email2 { get; set; }
        [Required,Url]
        public string Url { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<OfficeNameTranslate> OfficeNameTranlates { get; set; }
        public ICollection<AppUser> Users { get; set; }
    }
}
