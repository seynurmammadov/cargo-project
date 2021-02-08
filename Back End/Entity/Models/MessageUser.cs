using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entity.Models
{
     public class MessageUser:IEntity
     {
        public int Id { get; set; }
        [Required]
        public string Fullname { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string CamexId { get; set; }
        [Required]
        public string Message { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsAnswered{ get; set; }
    }
}
