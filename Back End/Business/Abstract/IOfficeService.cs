using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IOfficeService
    {
        Office GetWithId(int id);
        List<Office> GetAllActive();
        List<Office> GetAll();

        void Add(Office data);
        void Update(Office data);
        void Detele(int id);
    }
}
