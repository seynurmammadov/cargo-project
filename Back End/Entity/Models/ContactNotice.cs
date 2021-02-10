using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class ContactNotice:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string DescRus { get; set; }
        [Required]
        public string DescEng { get; set; }
        [Required]
        public string DescAz { get; set; }
    }
}
