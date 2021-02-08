using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
      public interface INewsDAL : IEntityRepository<News>
    {
        List<News> GetAllNInclude(Expression<Func<News, bool>> filter = null);
        News GetNInclude(Expression<Func<News, bool>> filter = null);
    }
}
