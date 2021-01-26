using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICitizenshipService
    {
        Citizenship GetCitizenWithId(int id);
        List<Citizenship> GetAllCitizens();

        void Add(Citizenship data);
        void Update(Citizenship data);
        void Detele(int id);
    }
}
