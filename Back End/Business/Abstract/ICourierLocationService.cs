using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICourierLocationService
    {
        CourierLocation GetWithId(int id);
        List<CourierLocation> GetAll();
        List<CourierLocation> GetAllActive();

        void Add(CourierLocation data);
        void Update(CourierLocation data);
        void Detele(int id);
    }
}
