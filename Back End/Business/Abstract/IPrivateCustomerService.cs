using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IPrivateCustomerService
    {
        PrivateCustomer GetPrivateCustomerWithId(int id);
        List<PrivateCustomer> GetAllPrivateCustomers();

        bool Add(PrivateCustomer customer);
        void Update(PrivateCustomer customer);
        void Detele(int id);  
    }
}
