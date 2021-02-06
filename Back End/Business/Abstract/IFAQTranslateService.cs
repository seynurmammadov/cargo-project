using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IFAQTranslateService
    {
        FAQTranslate GetWithId(int id);
        List<FAQTranslate> GetAll();
        void Add(FAQTranslate data);
        void Update(FAQTranslate data);
        void Detele(int id);
    }
}
