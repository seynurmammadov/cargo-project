using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class FAQManager:IFAQService
    {
        private readonly IFAQDAL _context;

        public FAQManager(IFAQDAL context)
        {
            _context = context;
        }
        public void Add(FAQ data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new FAQ { Id = id });
        }

        public List<FAQ> GetAll()
        {
            return _context.GetAllNInclude(c => !c.IsDeleted);
        }
        public List<FAQ> GetAllActive()
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted);
        }
        public FAQ GetWithId(int id)
        {
            return _context.Get(c => c.Id == id && !c.IsDeleted);
        }

        public void Update(FAQ data)
        {
            _context.Update(data);
        }
    }
}
