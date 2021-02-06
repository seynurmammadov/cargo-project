using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Shop:IEntity
    {
        public int Id { get; set; }
        [NotMapped]
        public string Translates { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ShopLink> ShopLinks { get; set; }
        public ICollection<ShopTranslate> ShopTranslates { get; set; }

    }
}
