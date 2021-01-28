using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ProductManager:IProductService
    {
        private readonly IProductDAL _context;
        public ProductManager(IProductDAL context)
        {
            _context = context;
        }
        public void Add(Product data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new Product { Id = id });
        }

        public List<Product> GetAll()
        {
            return _context.GetAllNInclude(o => !o.IsDeleted);
        }
        public List<Product> GetAllActive()
        {
            return _context.GetAllNInclude(o => o.IsActived && !o.IsDeleted);
        }

        public Product GetWithId(int id)
        {
            return _context.Get(o => o.Id == id);
        }

        public void Update(Product data)
        {
            _context.Update(data);
        }
    }
}
