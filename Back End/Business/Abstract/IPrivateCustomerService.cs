using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IPrivateCustomerService
    {
        PrivateCustomer GetWithFIN(string FINcode);
        PrivateCustomer GetWithPassportNumber(int PassportNumber);
        PrivateCustomer GetWithCamexId(int CamexId);
        List<PrivateCustomer> GetAll();

        void Add(PrivateCustomer data);
        void Update(PrivateCustomer data);
        void Detele(int id);  
    }
}
