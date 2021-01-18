using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IOfficeService
    {
        Office GetOfficeWithId(int id);
        List<Office> GetAllOffices();

        void Add(Office data);
        void Update(Office data);
        void Detele(int id);
    }
}
