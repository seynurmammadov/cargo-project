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
    public class EFShop : EFRepositoryBase<Shop, AppDbContext>, IShopDAL
    {
        public List<Shop> GetAllNInclude(Expression<Func<Shop, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Shops.Include(c => c.ShopLinks).Include(s => s.ShopTranslates).ToList()
                    : context.Shops.Where(filter).Include(c => c.ShopLinks).Include(s=>s.ShopTranslates).ToList();
            };
        }
        public Shop GetNInclude(Expression<Func<Shop, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Shops.Include(c => c.ShopLinks).Include(s => s.ShopTranslates).FirstOrDefault()
                    : context.Shops.Where(filter).Include(c => c.ShopLinks).Include(s => s.ShopTranslates).FirstOrDefault();
            };
        }
    }
}
