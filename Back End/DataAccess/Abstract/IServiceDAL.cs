using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface IServiceDAL : IEntityRepository<Service>
    {
        List<Service> GetAllNInclude(Expression<Func<Service, bool>> filter = null);
    }

}