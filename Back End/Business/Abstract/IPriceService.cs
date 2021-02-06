using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Business.Abstract
{
    public interface IPriceService
    {
        PriceList GetWithId(int id);
        List<PriceList> GetAll(Expression<Func<PriceList, bool>> filter);
        void Add(PriceList data);
        void Update(PriceList data);
        void Detele(int id);
    }
}
