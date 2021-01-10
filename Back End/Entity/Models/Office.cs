using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Models
{
    public class Office : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<AppUser> Users { get; set; }

    }
}
