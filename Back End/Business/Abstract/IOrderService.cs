using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IOrderService
    {
        Order GetWithId(int id);
        List<Order> GetAll();
        List<Order> GetAllActive(string id);

        void Add(Order data);
        void Update(Order data);
        void Detele(int id);
    }
}
