using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class Status:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Cargo> Cargos { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
