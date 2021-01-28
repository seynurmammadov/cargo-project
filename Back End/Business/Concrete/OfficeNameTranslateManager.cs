using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class OfficeNameTranslateManager:IOfficeNameTranslateService
    {
        private readonly IOfficeNameTranslateDAL _context;

        public OfficeNameTranslateManager(IOfficeNameTranslateDAL context)
        {
            _context = context;
        }

        public List<OfficeNameTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public OfficeNameTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(OfficeNameTranslate data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new OfficeNameTranslate { Id = id });
        }

        public void Update(OfficeNameTranslate data)
        {
            _context.Update(data);
        }
    }
}
