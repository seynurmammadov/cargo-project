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
    public class EFProduct:EFRepositoryBase<Product, AppDbContext>, IProductDAL
    {
        public List<Product> GetAllNInclude(Expression<Func<Product, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Product.Include(p => p.ProductTranslates).ToList()
                    : context.Product.Where(filter).Include(p => p.ProductTranslates).ToList();
            };
        }
    }
}
