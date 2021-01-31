using Core.Repository;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Abstract
{
    public interface IOrderDAL:IEntityRepository<Order>
    {
        List<Order> GetAllNInclude(Expression<Func<Order, bool>> filter = null);
    }
    
}
