using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface INewsService
    {
        News GetWithId(int id);
        List<News> GetAllActive();
        List<News> GetAll();

        void Add(News data);
        void Update(News data);
        void Detele(int id);
    }
}
