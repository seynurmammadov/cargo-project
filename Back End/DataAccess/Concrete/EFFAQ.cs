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
    public class EFFAQ : EFRepositoryBase<FAQ, AppDbContext>, IFAQDAL
    {
        public List<FAQ> GetAllNInclude(Expression<Func<FAQ, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.FAQs.Include(c => c.FAQTranslates).ToList()
                    : context.FAQs.Where(filter).Include(c => c.FAQTranslates).ToList();
            };
        }
    }
}
