using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IBusinessCustomerService
    {
        BusinessCustomer GetWithNumber(int CompanyRegistrationNumber);
        BusinessCustomer GetWithName(string CompanyName);
        BusinessCustomer GetWithCamexId(int CamexId);
        List<BusinessCustomer> GetAll();

        void Add(BusinessCustomer data);
        void Update(BusinessCustomer data);
        void Detele(int id);
    }
}
