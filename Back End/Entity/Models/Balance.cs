using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Models
{
    public class Balance : IEntity
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
        public float UserBalance { get; set; } 
    }
}
