using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CourierLocationManager : ICourierLocationService
    {
        private readonly ICourierLocationDAL _context;

        public CourierLocationManager(ICourierLocationDAL context)
        {
            _context = context;
        }
        public void Add(CourierLocation data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new CourierLocation { Id = id });
        }

        public List<CourierLocation> GetAll()
        {
            return _context.GetAllNInclude(c => !c.IsDeleted);
        }
        public List<CourierLocation> GetAllActive()
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted);
        }
        public CourierLocation GetWithId(int id)
        {
            return _context.Get(c => c.Id == id && !c.IsDeleted);
        }

        public void Update(CourierLocation data)
        {
            _context.Update(data);
        }
    }
}
