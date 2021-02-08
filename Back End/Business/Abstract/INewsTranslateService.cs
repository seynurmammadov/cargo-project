using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface INewsTranslateService
    {
        NewsTranslate GetWithId(int id);
        List<NewsTranslate> GetAll();

        void Add(NewsTranslate data);
        void Update(NewsTranslate data);
        void Detele(int id);
    }
}
