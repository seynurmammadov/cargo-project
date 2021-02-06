using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class ServiceTranslate:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public int ServiceId { get; set; }
        public virtual Service Service { get; set; }
        public int LanguageId { get; set; }
    }
}
