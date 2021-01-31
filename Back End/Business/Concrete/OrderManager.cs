using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class OrderManager : IOrderService
    {
        private readonly IOrderDAL _context;

        public OrderManager(IOrderDAL context)
        {
            _context = context;
        }

        public List<Order> GetAll()
        {
            return _context.GetAllNInclude(c => !c.IsDeleted);
        }
        public List<Order> GetAllActive(string id)
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted && c.UserId == id );
        }
        public Order GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(Order data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Order { Id = id });
        }

        public void Update(Order data)
        {
            _context.Update(data);
        }
    }
}
