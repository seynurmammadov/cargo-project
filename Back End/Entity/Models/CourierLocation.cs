using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class CourierLocation:IEntity
    {
        public int Id { get; set; }
        [Required]
        public decimal Price { get; set; }
        [NotMapped]
        public string Translates { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<CourierTranslate> CourierTranslates { get; set; }

    }
}
