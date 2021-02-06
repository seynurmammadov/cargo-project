using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IFAQService
    {
        FAQ GetWithId(int id);
        List<FAQ> GetAll();
        List<FAQ> GetAllActive();

        void Add(FAQ data);
        void Update(FAQ data);
        void Detele(int id);
    }
}
