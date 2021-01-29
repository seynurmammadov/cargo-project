using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface INoticeTranslateService
    {
        NoticeTranslate GetWithId(int id);
        List<NoticeTranslate> GetAll();

        void Add(NoticeTranslate data);
        void Update(NoticeTranslate data);
        void Detele(int id);
    }
}
