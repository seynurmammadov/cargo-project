using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface ICityDAL:IEntityRepository<City>
    {
        List<City> GetAllNInclude(Expression<Func<City, bool>> filter = null);
        
    }
}
