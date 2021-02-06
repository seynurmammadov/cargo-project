using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface ITariffDAL : IEntityRepository<Tariff>
    {
        List<Tariff> GetAllNInclude(Expression<Func<Tariff, bool>> filter = null);
      /*  Country GetNInclude(Expression<Func<Country, bool>> filter = null);*/
    }
}
