using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Bio:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string PageTitle { get; set; }
        [Required]
        public string CallCenter { get; set; }
        public string LogoNavbar { get; set; }
        public string LogoFooter { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }
        [NotMapped]
        public IFormFile Photo2 { get; set; }
        [Required]
        public string ShortDescRus { get; set; }
        [Required]
        public string ShortDescEng { get; set; }
        [Required]
        public string ShortDescAz { get; set; }

        public string SliderTitleRus { get; set; }
        [Required]
        public string SliderTitleEng { get; set; }
        [Required]
        public string SliderTitleAz { get; set; }
    }
}
