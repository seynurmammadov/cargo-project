using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Models
{
    public class Language : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string FlagSrc { get; set; }

        public ICollection<CityNameTranslate> CityNameTranslates { get; set; }
        public ICollection<OfficeNameTranlate> OfficeNameTranlates { get; set; }

    }
}
