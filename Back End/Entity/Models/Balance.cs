using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class Balance : IEntity
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public float UserBalance { get; set; }
        public AppUser User { get; set; }
        public DateTime ModifiedDate { get; set; }
        public Balance()
        {
            this.ModifiedDate = DateTime.UtcNow;
        }
    }
}
