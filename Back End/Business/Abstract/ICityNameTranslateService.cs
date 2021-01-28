using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICityNameTranslateService
    {
        CityNameTranslate GetWithId(int id);
        List<CityNameTranslate> GetAll();

        void Add(CityNameTranslate data);
        void Update(CityNameTranslate data);
        void Detele(int id);
    }
}
