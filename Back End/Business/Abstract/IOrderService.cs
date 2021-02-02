using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IOrderService
    {
        Order GetWithId(int id);
        List<Order> GetAllActive(string str);
        List<Order> GetAllActiveWithUserId(string id);
        void Add(Order data);
        void Update(Order data);
        void Detele(int id);
    }
}
