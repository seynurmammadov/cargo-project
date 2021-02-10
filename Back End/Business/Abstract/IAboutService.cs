using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IAboutService
    {
        About GetWithId(int id);
        List<About> GetAll();
        void Add(About data);
        void Update(About data);
        void Detele(int id);
    }
}
