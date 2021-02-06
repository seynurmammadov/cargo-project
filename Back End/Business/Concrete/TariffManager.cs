using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Business.Concrete
{
    public class TariffManager:ITariffService
    {
        private readonly ITariffDAL _context;

        public TariffManager(ITariffDAL context)
        {
            _context = context;
        }
        public void Add(Tariff data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new Tariff { Id = id });
        }

        public List<Tariff> GetAll(Expression<Func<Tariff, bool>> filter )
        {
            return _context.GetAllNInclude(filter);
        }
        public Tariff GetWithId(int id)
        {
            return _context.Get(c => c.Id == id );
        }

        public void Update(Tariff data)
        {
            _context.Update(data);
        }
    }
}
