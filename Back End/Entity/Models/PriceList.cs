using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class PriceList:IEntity
    {
        public int Id { get; set; }
        [Required]
        public decimal Min { get; set; }
        [Required]
        public decimal Max { get; set; }
        [Required]
        public decimal Price { get; set; }
        public int TariffId { get; set; }
        public Tariff Tariff { get; set; }

    }
}
