using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IOfficeNameTranslateService
    {
        OfficeNameTranslate GetOfficeNameTranlateWithId(int id);
        List<OfficeNameTranslate> GetAllOfficeNameTranlates();

        void Add(OfficeNameTranslate data);
        void Update(OfficeNameTranslate data);
        void Detele(int id);
    }
}
