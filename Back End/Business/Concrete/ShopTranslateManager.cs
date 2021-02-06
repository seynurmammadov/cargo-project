using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public  class ShopTranslateManager :IShopTranslateService
    {
        private readonly IShopTranslateDAL _context;

        public ShopTranslateManager(IShopTranslateDAL context)
        {
            _context = context;
        }

        public List<ShopTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public ShopTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(ShopTranslate data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new ShopTranslate { Id = id });
        }

        public void Update(ShopTranslate data)
        {
            _context.Update(data);
        }
    }
}
