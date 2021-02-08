using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class NewsManager : INewsService
    {
        private readonly INewsDAL _context;
        public NewsManager(INewsDAL context)
        {
            _context = context;
        }
        public void Add(News data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new News { Id = id });
        }

        public List<News> GetAll()
        {
            return _context.GetAllNInclude(o => !o.IsDeleted);
        }
        public List<News> GetAllActive()
        {
            return _context.GetAllNInclude(o => o.IsActived && !o.IsDeleted);
        }
         
        public News GetWithId(int id)
        {
            return _context.GetNInclude(o => o.Id == id && o.IsActived && !o.IsDeleted);
        }

        public void Update(News data)
        {
            _context.Update(data);
        }
    }
}
