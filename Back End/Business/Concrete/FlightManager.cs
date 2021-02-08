using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class FlightManager : IFlightService
    {
        private readonly IFlightDAL _context;

        public FlightManager(IFlightDAL context)
        {
            _context = context;
        }

        public List<Flight> GetAll()
        {
            return _context.GetAll(c=>!c.IsDeleted);
        }
        public List<Flight> GetAllActive()
        {
            return _context.GetAll(c => c.IsActived && !c.IsDeleted);
        }
        public Flight GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(Flight data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Flight { Id = id });
        }

        public void Update(Flight data)
        {
            _context.Update(data);
        }
    }
}
