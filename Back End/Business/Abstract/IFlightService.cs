using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IFlightService
    {
        Flight GetWithId(int id);
        List<Flight> GetAll();
        List<Flight> GetAllActive();
        void Add(Flight data);
        void Update(Flight data);
        void Detele(int id);
    }
}
