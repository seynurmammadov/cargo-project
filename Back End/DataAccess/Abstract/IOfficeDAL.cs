using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface IOfficeDAL:IEntityRepository<Office>
    {
        List<Office> GetAllNInclude(Expression<Func<Office, bool>> filter = null);

    }
}
