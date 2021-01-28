using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ProductTranslateManager: IProductTranslateService
    {
        private readonly IProductTranslateDAL _context;

        public ProductTranslateManager(IProductTranslateDAL context)
        {
            _context = context;
        }

        public List<ProductTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public ProductTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(ProductTranslate data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new ProductTranslate { Id = id });
        }

        public void Update(ProductTranslate data)
        {
            _context.Update(data);
        }
    }
}
