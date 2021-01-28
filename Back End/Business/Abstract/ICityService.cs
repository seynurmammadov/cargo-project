using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICityService
    {
        City GetWithId(int id);
        List<City> GetAll();
        List<City> GetAllActive();

        void Add(City data);
        void Update(City data);
        void Detele(int id);
    }
}
