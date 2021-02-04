using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class ShopLink:IEntity
    {
        public int Id { get; set; }
        [Required , Url]
        public string Link { get; set; }
        public int ShopId { get; set; }
        public virtual Shop Shop { get; set; }
    }
}
