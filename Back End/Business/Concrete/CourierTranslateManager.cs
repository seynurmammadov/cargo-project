using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CourierTranslateManager:ICourierTranslateService
    {
        private readonly ICourierTranslateDAL _context;

        public CourierTranslateManager(ICourierTranslateDAL context)
        {
            _context = context;
        }
        public void Add(CourierTranslate data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new CourierTranslate { Id = id });
        }

        public List<CourierTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public CourierTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id );
        }

        public void Update(CourierTranslate data)
        {
            _context.Update(data);
        }
    }
}
