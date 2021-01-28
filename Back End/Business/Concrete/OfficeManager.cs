using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class OfficeManager : IOfficeService
    {
        private readonly IOfficeDAL _context;
        public OfficeManager(IOfficeDAL context)
        {
            _context = context;
        }
        public void Add(Office data)
        {
             _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Office { Id = id });
        }

        public List<Office> GetAll()
        {
            return _context.GetAllNInclude(o=>!o.IsDeleted);
        }
        public List<Office> GetAllActive()
        {
            return _context.GetAllNInclude(o => o.IsActived && !o.IsDeleted);
        }

        public Office GetWithId(int id)
        {
            return _context.Get(o=>o.Id==id);
        }

        public void Update(Office data)
        {
            _context.Update(data);
        }
    }
}
