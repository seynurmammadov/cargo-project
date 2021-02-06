using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IServiceService
    {
        Service GetWithId(int id);
        List<Service> GetAll();
        List<Service> GetAllActive();

        void Add(Service data);
        void Update(Service data);
        void Detele(int id);
    }
}
