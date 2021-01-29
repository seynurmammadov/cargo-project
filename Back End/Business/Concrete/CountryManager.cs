using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CountryManager:ICountryService
    {
        private readonly ICountryDAL _context;

        public CountryManager(ICountryDAL context)
        {
            _context = context;
        }
        public void Add(Country data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new Country { Id = id });
        }

        public List<Country> GetAll()
        {
            return _context.GetAllNInclude(c=>!c.IsDeleted);
        }
        public List<Country> GetAllActive()
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted);
        }
        public Country GetWithId(int id)
        {
            return _context.GetNInclude(c => c.Id == id && !c.IsDeleted);
        }

        public void Update(Country data)
        {
            _context.Update(data);
        }
    }
}
