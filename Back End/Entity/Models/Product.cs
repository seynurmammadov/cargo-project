using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class Product : IEntity
    {
        public int Id { get; set; }
        [Required]
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ProductTranslate> ProductTranslates { get; set; }
        public ICollection<Cargo> Cargos { get; set; }
    }
}
