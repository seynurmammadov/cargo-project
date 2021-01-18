using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICityService
    {
        City GetCityWithId(int id);
        List<City> GetAllCities();

        void Add(City data);
        void Update(City data);
        void Detele(int id);
    }
}
