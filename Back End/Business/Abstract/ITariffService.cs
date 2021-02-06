using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Business.Abstract
{
    public interface ITariffService
    {
        Tariff GetWithId(int id);
        List<Tariff> GetAll(Expression<Func<Tariff, bool>> filter );
        void Add(Tariff data);
        void Update(Tariff data);
        void Detele(int id);
    }
}
