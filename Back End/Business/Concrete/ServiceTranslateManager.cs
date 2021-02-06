using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ServiceTranslateManager: IServiceTranslateService
    {
        private readonly IServiceTranslateDAL _context;

        public ServiceTranslateManager(IServiceTranslateDAL context)
        {
            _context = context;
        }
        public void Add(ServiceTranslate data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new ServiceTranslate { Id = id });
        }

        public List<ServiceTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public ServiceTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Update(ServiceTranslate data)
        {
            _context.Update(data);
        }
    }
}
