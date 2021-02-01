using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class CargoManager:ICargoService
    {
        private readonly ICargoDAL _context;

        public CargoManager(ICargoDAL context)
        {
            _context = context;
        }

        public List<Cargo> GetAll()
        {
            return _context.GetAllNInclude(c => !c.IsDeleted);
        }
        public List<Cargo> GetAllActiveStatement(string id)
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted && c.UserId ==id && c.Status.Name=="Statement");
        }
        public List<Cargo> GetAllActiveWaitingInvoice(string id)
        {
            return _context.GetAllNIncludeOffice(c => c.IsActived && !c.IsDeleted && c.UserId == id && c.Status.Name == "WaitingInvoice");
        }
        public Cargo GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(Cargo data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Cargo { Id = id });
        }

        public void Update(Cargo data)
        {
            _context.Update(data);
        }
    }
}
