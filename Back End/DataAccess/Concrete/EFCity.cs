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
    public class EFCity : EFRepositoryBase<City, AppDbContext>, ICityDAL
    {
        public List<City> GetAllNInclude(Expression<Func<City, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Cities.Include(c=>c.CityNameTranslates).ToList()
                    : context.Cities.Where(filter).Include(c => c.CityNameTranslates).ToList();
            };
        }
    }
}
