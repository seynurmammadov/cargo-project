using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class StatusManager:IStatusService
    {
        private readonly IStatusDAL _context;

        public StatusManager(IStatusDAL context)
        {
            _context = context;
        }
        public void Add(Status data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new Status { Id = id });
        }

        public List<Status> GetAll()
        {
            return _context.GetAll(c => !c.IsDeleted);
        }
        
        public Status GetWithStatement(string name)
        {
            return _context.Get(c=>c.Name==name && !c.IsDeleted);
        }
        public Status GetWithId(int id)
        {
            return _context.Get(c => c.Id == id && !c.IsDeleted);
        }

        public void Update(Status data)
        {
            _context.Update(data);
        }
    }
}
