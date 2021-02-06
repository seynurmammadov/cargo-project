using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICourierTranslateService
    {
        CourierTranslate GetWithId(int id);
        List<CourierTranslate> GetAll();
        void Add(CourierTranslate data);
        void Update(CourierTranslate data);
        void Detele(int id);
    }
}
