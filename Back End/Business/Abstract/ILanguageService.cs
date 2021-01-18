using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ILanguageService
    {
        Language GetLanguageWithId(int id);
        List<Language> GetAllLanguages();
        void Add(Language data);
        void Update(Language data);
        void Detele(int id);
    }
}
