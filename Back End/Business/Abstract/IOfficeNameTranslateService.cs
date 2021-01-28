using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IOfficeNameTranslateService
    {
        OfficeNameTranslate GetWithId(int id);
        List<OfficeNameTranslate> GetAll();

        void Add(OfficeNameTranslate data);
        void Update(OfficeNameTranslate data);
        void Detele(int id);
    }
}
