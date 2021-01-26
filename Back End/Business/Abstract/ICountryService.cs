using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICountryService
    {
        Country GetCountryWithId(int id);
        List<Country> GetAllCountries();
        void Add(Country data);
        void Update(Country data);
        void Detele(int id);
    }
}
