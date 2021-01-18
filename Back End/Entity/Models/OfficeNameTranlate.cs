using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Models
{
    public class OfficeNameTranlate : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OfficeId { get; set; }
        public virtual Office Office { get; set; }
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; }
    }
}
