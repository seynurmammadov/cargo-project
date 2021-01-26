using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IBusinessCustomerService
    {
        BusinessCustomer GetBusinessCustomerWithNumber(int CompanyRegistrationNumber);
        BusinessCustomer GetBusinessCustomerWithName(string CompanyName);
        BusinessCustomer GetBusinessCustomerWithCamexId(int CamexId);
        List<BusinessCustomer> GetAllBusinessCustomers();

        void Add(BusinessCustomer data);
        void Update(BusinessCustomer data);
        void Detele(int id);
    }
}
