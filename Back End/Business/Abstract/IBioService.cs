using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IBioService
    {
        Bio GetWithId(int id);
        List<Bio> GetAll();
        void Add(Bio data);
        void Update(Bio data);
        void Detele(int id);
    }
}
