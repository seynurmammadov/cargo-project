using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICountryService
    {
        Country GetWithId(int id);
        List<Country> GetAll();
        void Add(Country data);
        void Update(Country data);
        void Detele(int id);
    }
}
