using Core.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity.Models
{
    public class Tariff:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string To { get; set; }
        [NotMapped]
        public string Prices { get; set; }
        public ICollection<PriceList> PriceLists { get; set; }
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
