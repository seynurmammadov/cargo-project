using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CountryAddressDescriptionManager:ICountryAddressDescriptionService
    {
        private readonly ICountryAddressDescriptionDAL _context;

        public CountryAddressDescriptionManager(ICountryAddressDescriptionDAL context)
        {
            _context = context;
        }
        public void Add(CountryAddressDescription data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new CountryAddressDescription { Id = id });
        }

        public List<CountryAddressDescription> GetAllCountryAddressDescriptions()
        {
            return _context.GetAll();
        }

        public CountryAddressDescription GetCountryAddressDescriptionWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Update(CountryAddressDescription data)
        {
            _context.Update(data);
        }
    }
}
