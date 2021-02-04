using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public  interface IShopLinkService
    {
        ShopLink GetWithId(int id);
        List<ShopLink> GetAll();

        void Add(ShopLink data);
        void Update(ShopLink data);
        void Detele(int id);
    }
}
