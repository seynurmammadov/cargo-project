using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IShopService
    {
        Shop GetWithId(int id);
        List<Shop> GetAll();
        List<Shop> GetAllActive();

        void Add(Shop data);
        void Update(Shop data);
        void Detele(int id);
    }
}
