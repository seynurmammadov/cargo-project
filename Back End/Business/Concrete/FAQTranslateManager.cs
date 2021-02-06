using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class FAQTranslateManager:IFAQTranslateService
    {
        private readonly IFAQTranslateDAL _context;

        public FAQTranslateManager(IFAQTranslateDAL context)
        {
            _context = context;
        }
        public void Add(FAQTranslate data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new FAQTranslate { Id = id });
        }

        public List<FAQTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public FAQTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Update(FAQTranslate data)
        {
            _context.Update(data);
        }
    }
}
