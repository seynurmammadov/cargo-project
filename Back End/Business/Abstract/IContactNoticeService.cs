using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IContactNoticeService
    {
        ContactNotice GetWithId(int id);
        List<ContactNotice> GetAll();
        void Add(ContactNotice data);
        void Update(ContactNotice data);
        void Detele(int id);
    }
}
