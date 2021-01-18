using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IPrivateCustomerService
    {
        PrivateCustomer GetPrivateCustomerWithFIN(string FINcode);
        PrivateCustomer GetPrivateCustomerWithPassportNumber(int PassportNumber);
        List<PrivateCustomer> GetAllPrivateCustomers();

        void Add(PrivateCustomer data);
        void Update(PrivateCustomer data);
        void Detele(int id);  
    }
}
