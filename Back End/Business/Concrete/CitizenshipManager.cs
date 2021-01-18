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

        public List<Сitizenship> GetAllCitizens()
        {
            return _context.GetAll();
        }

        public Сitizenship GetCitizenWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(Сitizenship data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Сitizenship { Id = id });
        }

        public void Update(Сitizenship data)
        {
            _context.Update(data);
        }
    }
}
