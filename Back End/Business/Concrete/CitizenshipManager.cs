using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CitizenshipManager : ICitizenshipService
    {
        private readonly ICitizenshipDAL _context;

        public CitizenshipManager(ICitizenshipDAL context)
        {
            _context = context;
        }

        public List<Citizenship> GetAllCitizens()
        {
            return _context.GetAll();
        }

        public Citizenship GetCitizenWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(Citizenship data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Citizenship { Id = id });
        }

        public void Update(Citizenship data)
        {
            _context.Update(data);
        }
    }
}
