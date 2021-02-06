using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IServiceTranslateService
    {
        ServiceTranslate GetWithId(int id);
        List<ServiceTranslate> GetAll();
        void Add(ServiceTranslate data);
        void Update(ServiceTranslate data);
        void Detele(int id);
    }
}
