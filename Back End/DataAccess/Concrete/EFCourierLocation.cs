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
    public class EFCourierLocation : EFRepositoryBase<CourierLocation, AppDbContext>, ICourierLocationDAL
    {
        public List<CourierLocation> GetAllNInclude(Expression<Func<CourierLocation, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.CourierLocations.Include(c=>c.CourierTranslates).ToList()
                    : context.CourierLocations.Where(filter).Include(c => c.CourierTranslates).ToList();
            };
        }
    }
}
