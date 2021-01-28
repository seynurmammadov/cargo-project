using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CityManager:ICityService
    {
        private readonly ICityDAL _context;

        public CityManager(ICityDAL context)
        {
            _context = context;
        }

        public List<City> GetAll()
        {
            return _context.GetAllNInclude(c=>!c.IsDeleted);
        }
        public List<City> GetAllActive()
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted);
        }
        public City GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(City data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new City { Id = id });
        }

        public void Update(City data)
        {
            _context.Update(data);
        }
    }
}
