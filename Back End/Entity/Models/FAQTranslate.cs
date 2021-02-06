using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class FAQTranslate : IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public int FAQId { get; set; }
        public virtual FAQ FAQ { get; set; }
        public int LanguageId { get; set; }
    }
}
