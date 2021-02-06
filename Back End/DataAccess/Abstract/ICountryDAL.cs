using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface ICountryDAL:IEntityRepository<Country>
    {
        List<Country> GetAllNInclude(Expression<Func<Country, bool>> filter = null);
        Country GetNInclude (Expression<Func<Country, bool>> filter = null);
        List<Country> GetNIncludeTariff(Expression<Func<Country, bool>> filter = null);
    }
}
