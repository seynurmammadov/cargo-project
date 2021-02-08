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
 
    public class EFNews : EFRepositoryBase<News, AppDbContext>, INewsDAL
    {
        public List<News> GetAllNInclude(Expression<Func<News, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.News.Include(c => c.NewsTranslates).ToList()
                    : context.News.Where(filter).Include(c => c.NewsTranslates).ToList();
            };
        }
        public News GetNInclude(Expression<Func<News, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.News.Include(c => c.NewsTranslates).FirstOrDefault()
                    : context.News.Where(filter).Include(c => c.NewsTranslates).FirstOrDefault();
            };
        }
    }
}
