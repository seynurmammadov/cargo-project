 using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class LanguageManager:ILanguageService
    {
        private readonly ILanguageDAL _context;

        public LanguageManager(ILanguageDAL context)
        {
            _context = context;
        }

        public List<Language> GetAll()
        {
            return _context.GetAll();
        }

        public Language GetWithId(int id)
        {
            return _context.Get(l => l.Id == id);
        }

        public void Add(Language data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Language { Id = id });
        }

        public void Update(Language data)
        {
            _context.Update(data);
        }
    }
}
