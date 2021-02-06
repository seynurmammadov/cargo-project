using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{

    public interface ICourierLocationDAL : IEntityRepository<CourierLocation>
    {
        List<CourierLocation> GetAllNInclude(Expression<Func<CourierLocation, bool>> filter = null);
    }
}
