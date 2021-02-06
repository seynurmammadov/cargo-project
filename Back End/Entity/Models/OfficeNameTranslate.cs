using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class OfficeNameTranslate : IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string WorkTime { get; set; }
        public int OfficeId { get; set; }
        public virtual Office Office { get; set; }
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; }
    }
}
