using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IProductService
    {
        Product GetWithId(int id);
        List<Product> GetAllActive();
        List<Product> GetAll();

        void Add(Product data);
        void Update(Product data);
        void Detele(int id);
    }
}
