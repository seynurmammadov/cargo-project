using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
    public class MessageAdmin:IEntity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        [Required]
        public string Message { get; set; }
    }
}
