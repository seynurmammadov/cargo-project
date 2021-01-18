using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class BalanceManager : IBalanceService
    {
        private readonly IBalanceDAL _context;

        public BalanceManager(IBalanceDAL context)
        {
            _context = context;
        }
        public void Add(Balance data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new Balance { Id = id });
        }

        public List<Balance> GetAllBalance()
        {
            return _context.GetAll();
        }

        public Balance GetBalanceWithUserId(string id)
        {
            return _context.Get(b => b.UserId == id);
        }

        public void Update(Balance data)
        {
            _context.Update(data);
        }
    }
}
