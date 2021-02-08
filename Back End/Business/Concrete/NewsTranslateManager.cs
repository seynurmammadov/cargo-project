using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class NewsTranslateManager : INewsTranslateService
    {
        private readonly INewsTranslateDAL _context;
        
        public NewsTranslateManager(INewsTranslateDAL context)
        {
            _context = context;
        }

        public List<NewsTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public NewsTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(NewsTranslate data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new NewsTranslate { Id = id });
        }

        public void Update(NewsTranslate data)
        {
            _context.Update(data);
        }
    }
}
