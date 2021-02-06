using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IShopTranslateService
    {
        ShopTranslate GetWithId(int id);
        List<ShopTranslate> GetAll();

        void Add(ShopTranslate data);
        void Update(ShopTranslate data);
        void Detele(int id);
    }
 
}
