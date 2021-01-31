using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class Receipt:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Value { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActived{ get; set; }
        public Receipt()
        {
            this.CreatedDate = DateTime.UtcNow;
        }
    }
}
