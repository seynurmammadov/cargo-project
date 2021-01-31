using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class Order:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        [Required] 
        public float CargoPrice { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        [Url]
        public string Url { get; set; }
        [Required]
        public int Count { get; set; }
        public string NoticeProduct { get; set; }
        public string Notice { get; set; }
        public int StatusId { get; set; }
        public virtual Status Status { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public int ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public Order()
        {
            this.CreatedDate = DateTime.UtcNow;
            this.ModifiedDate = DateTime.UtcNow;
        }
    }
}
