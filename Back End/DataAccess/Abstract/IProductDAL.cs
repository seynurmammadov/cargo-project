using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface IProductDAL: IEntityRepository<Product>
    {
        List<Product> GetAllNInclude(Expression<Func<Product, bool>> filter = null);
    }
}
