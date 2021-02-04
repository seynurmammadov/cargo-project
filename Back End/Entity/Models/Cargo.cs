using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Cargo:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Track { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public int Count { get; set; }
        public string Notice { get; set; }
        public string Image { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }
        public string TrackCamex { get; set; }
        public float Weight { get; set; }
        public float CamexPrice { get; set; }
        public int OfficeId { get; set; }
        public virtual Office Office { get; set; }
        public int StatusId { get; set; }
        public virtual Status Status { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public bool PaymentStatus { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        [NotMapped]
        public int CamexId { get; set; }
        public Cargo()
        {
            this.CreatedDate = DateTime.UtcNow;
            this.ModifiedDate = DateTime.UtcNow;
        }

    }

}
