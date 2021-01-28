using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class ProductTranslate:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; }
    }
}
