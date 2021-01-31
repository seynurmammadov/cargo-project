using Core.Repository.EntityFramework;
using DataAccess.Abstract;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete
{
    public class EFOrder : EFRepositoryBase<Order, AppDbContext>, IOrderDAL
    {
        public List<Order> GetAllNInclude(Expression<Func<Order, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Orders.Include(c => c.Country).Include(c => c.Status).Include(c=>c.Country).Include(r=>r.Receipt).ToList()
                    : context.Orders.Where(filter).Include(c => c.Status).Include(c => c.Country).Include(r => r.Receipt).ToList();
            };
        }
    }
}
