using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
   public interface IStatusService
    {
        Status GetWithId(int id);
        Status GetWithStatement(string name);
        List<Status> GetAll();
        void Add(Status data);
        void Update(Status data);
        void Detele(int id);
    }
}
