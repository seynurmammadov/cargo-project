using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CityNameTranslateManager:ICityNameTranslateService
    {
        private readonly ICityNameTranslateDAL _context;

        public CityNameTranslateManager(ICityNameTranslateDAL context)
        {
            _context = context;
        }

        public List<CityNameTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public CityNameTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(CityNameTranslate data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new CityNameTranslate { Id = id });
        }

        public void Update(CityNameTranslate data)
        {
            _context.Update(data);
        }
    }
}
