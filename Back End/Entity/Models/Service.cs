using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Service:IEntity
    {
        public int Id { get; set; }
        public string Image { get; set; }
        [NotMapped]
        public string Translates { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ServiceTranslate> ServiceTranslates { get; set; }
    }
}
