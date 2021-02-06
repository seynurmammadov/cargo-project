using Core.Interfaces;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class ShopTranslate:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int ShopId { get; set; }
        public virtual Shop Shop { get; set; }
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; }
    }
}
