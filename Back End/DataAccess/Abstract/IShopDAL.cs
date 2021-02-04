using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface IShopDAL : IEntityRepository<Shop>
    {
        List<Shop> GetAllNInclude(Expression<Func<Shop, bool>> filter = null);

        Shop GetNInclude(Expression<Func<Shop, bool>> filter = null);
    }
}
