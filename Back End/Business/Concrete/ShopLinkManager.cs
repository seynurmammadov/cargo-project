using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ShopLinkManager:IShopLinkService
    {
        private readonly IShopLinkDAL _context;

        public ShopLinkManager(IShopLinkDAL context)
        {
            _context = context;
        }
        public void Add(ShopLink data)
        {
            _context.Add(data);

        }

        public void Detele(int id)
        {
            _context.Delete(new ShopLink { Id = id });
        }

        public List<ShopLink> GetAll()
        {
            return _context.GetAll();
        }

        public ShopLink GetWithId(int id)
        {
            return _context.Get(c => c.Id == id );
        }

        public void Update(ShopLink data)
        {
            _context.Update(data);
        }
    }
}
