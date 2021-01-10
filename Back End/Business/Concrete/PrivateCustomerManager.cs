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
        private readonly IPrivateCustomerDAL _customerDAL;

        public PrivateCustomerManager(IPrivateCustomerDAL customerDAL)
        {
            _customerDAL = customerDAL;
        }

        public List<PrivateCustomer> GetAllPrivateCustomers()
        {
            return _customerDAL.GetAll();
        }

        public PrivateCustomer GetPrivateCustomerWithId(int id)
        {
            return _customerDAL.Get(c => c.Id == id);
        }

        public bool Add(PrivateCustomer customer)
        {
            PrivateCustomer customer2 =  _customerDAL.Get(c => c.FINCode == customer.FINCode);
            if (customer2 != null) return false;

             customer2 = _customerDAL.Get(c => c.PassportNumber == customer.PassportNumber);
            if (customer2 != null) return false;

            _customerDAL.Add(customer);
            return true;
        }

        public void Detele(int id)
        {
            _customerDAL.Delete(new PrivateCustomer { Id = id });
        }

        public void Update(PrivateCustomer customer)
        {
            _customerDAL.Update(customer);
        }
    }
}
