using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Models
{
    public class CityNameTranslate : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; }
    }

}