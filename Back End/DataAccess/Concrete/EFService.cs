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
    public class EFService : EFRepositoryBase<Service, AppDbContext>, IServiceDAL
    {
        public List<Service> GetAllNInclude(Expression<Func<Service, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Services.Include(c => c.ServiceTranslates).ToList()
                    : context.Services.Where(filter).Include(c => c.ServiceTranslates).ToList();
            };
        }
    }
}
