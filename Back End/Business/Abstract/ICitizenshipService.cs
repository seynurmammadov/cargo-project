using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICitizenshipService
    {
        Citizenship GetWithId(int id);
        List<Citizenship> GetAll();

        void Add(Citizenship data);
        void Update(Citizenship data);
        void Detele(int id);
    }
}
