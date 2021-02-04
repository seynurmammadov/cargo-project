using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ShopManager:IShopService
    {
        private readonly IShopDAL _context;

        public ShopManager(IShopDAL context)
        {
            _context = context;
        }
        public void Add(Shop data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new Shop { Id = id });
        }

        public List<Shop> GetAll()
        {
            return _context.GetAllNInclude(c => !c.IsDeleted);
        }
        public List<Shop> GetAllActive()
        {
            return _context.GetAllNInclude(c => c.IsActived && !c.IsDeleted);
        }
        public Shop GetWithId(int id)
        {
            return _context.GetNInclude(c => c.Id == id && !c.IsDeleted);
        }

        public void Update(Shop data)
        {
            _context.Update(data);
        }
    }
}
