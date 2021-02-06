using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Business.Concrete
{
    public class PriceManager:IPriceService
    {
        private readonly IPriceDAL _context;

        public PriceManager(IPriceDAL context)
        {
            _context = context;
        }
        public void Add(PriceList data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new PriceList { Id = id });
        }

        public List<PriceList> GetAll(Expression<Func<PriceList, bool>> filter)
        {
            return _context.GetAll(filter);
        }

        public PriceList GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Update(PriceList data)
        {
            _context.Update(data);
        }
    }
}
