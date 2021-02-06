using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Country : IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public float Value { get; set; }
        public string Image { get; set; }
        public string BgImage { get; set; }
        public string Wallet { get; set; }

        [NotMapped]
        public string Notices { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }
        [NotMapped]
        public IFormFile FlagPhoto { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<CountryAddressDescription> CountryAddressDescriptions { get; set; }
        public ICollection<NoticeTranslate> NoticeTranslate { get; set; }
        public ICollection<Cargo> Cargo { get; set; }
        public ICollection<Order> Order { get; set; }
        public ICollection<Tariff> Tariff { get; set; }
    }
}
