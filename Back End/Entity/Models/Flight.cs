using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class Flight:IEntity
    {
        public int Id { get; set; }
        [Required]
        public string From { get; set; }
        [Required]
        public string To { get; set; }
        [Required]
        public DateTime LandingDate { get; set; }
        public bool IsActived { get; set; }
        public bool IsDeleted { get; set; }

    }
}
