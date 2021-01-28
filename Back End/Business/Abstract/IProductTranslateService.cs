using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IProductTranslateService
    {
        ProductTranslate GetWithId(int id);
        List<ProductTranslate> GetAll();

        void Add(ProductTranslate data);
        void Update(ProductTranslate data);
        void Detele(int id);
    }
}
