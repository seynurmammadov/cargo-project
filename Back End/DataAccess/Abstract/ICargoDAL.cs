using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface ICargoDAL : IEntityRepository<Cargo>
    {
        List<Cargo> GetAllNInclude(Expression<Func<Cargo, bool>> filter = null);
        List<Cargo> GetAllNIncludeOffice(Expression<Func<Cargo, bool>> filter = null);
        Cargo GetNInclude(Expression<Func<Cargo, bool>> filter = null);
    }
}
