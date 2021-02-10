using Core.Interfaces;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class AppUser:IdentityUser,IEntity
    {
        public int CamexId { get; set; }
        public Balance Balance { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public string Address { get; set; }
        public string ActiveCode { get; set; }
        public int OfficeId { get; set; }
        public virtual Office Office { get; set; }
        public string Image { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }
        public ICollection<Cargo> Cargos { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Receipt> Receipts { get; set; }
        public bool IsTermsAccepted { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public AppUser()
        {
            this.CreatedDate = DateTime.UtcNow;
            this.ModifiedDate = DateTime.UtcNow;
        }

    }
}
