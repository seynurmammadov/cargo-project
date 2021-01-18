using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IBalanceService
    {
        Balance GetBalanceWithUserId(string id);
        List<Balance> GetAllBalance();
        void Add(Balance data);
        void Update(Balance data);
        void Detele(int id);
    }
}
