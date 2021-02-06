using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
     public interface IFAQDAL : IEntityRepository<FAQ>
     {
        List<FAQ> GetAllNInclude(Expression<Func<FAQ, bool>> filter = null);
     }
}
