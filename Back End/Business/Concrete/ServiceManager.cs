using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ServiceManager: IServiceService
    {
        private readonly IServiceDAL _context;

        public ServiceManager(IServiceDAL context)
        {
            _context = context;
        }
        public void Add(Service data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new Service { Id = id });
        }

        public List<Service> GetAll()
        {
            return _context.GetAllNInclude(c => !c.IsDeleted);
        }
        public List<Service> GetAllActive()
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted);
        }
        public Service GetWithId(int id)
        {
            return _context.Get(c => c.Id == id && !c.IsDeleted);
        }

        public void Update(Service data)
        {
            _context.Update(data);
        }
    }
}
