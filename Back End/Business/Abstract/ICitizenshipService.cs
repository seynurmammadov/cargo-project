using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICitizenshipService
    {
        Сitizenship GetCitizenWithId(int id);
        List<Сitizenship> GetAllCitizens();

        void Add(Сitizenship data);
        void Update(Сitizenship data);
        void Detele(int id);
    }
}
