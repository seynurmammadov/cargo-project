using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
   public class PrivateCustomerManager : IPrivateCustomerService
    {
        private readonly IPrivateCustomerDAL _context;

        public PrivateCustomerManager(IPrivateCustomerDAL context)
        {
            _context = context;
        }

        public List<PrivateCustomer> GetAll()
        {
            return _context.GetAll();
        }

        public PrivateCustomer GetWithFIN(string FINCode)
        {
            return _context.Get(c => c.FINCode == FINCode);
        }
        public PrivateCustomer GetWithPassportNumber(int PassportNumber)
        {
            return _context.Get(c => c.PassportNumber == PassportNumber);
        }
        public PrivateCustomer GetWithCamexId(int CamexId)
        {
            return _context.Get(c => c.CamexId == CamexId);
        }

        public void Add(PrivateCustomer data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new PrivateCustomer { Id = id });
        }

        public void Update(PrivateCustomer data)
        {
            _context.Update(data);
        }
    }
}
