using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ILanguageService
    {
        Language GetWithId(int id);
        List<Language> GetAll();
        void Add(Language data);
        void Update(Language data);
        void Detele(int id);
    }
}
