using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class ContactNoticeManager : IContactNoticeService
    {
        private readonly IContactNoticeDAL _context;

        public ContactNoticeManager(IContactNoticeDAL context)
        {
            _context = context;
        }

        public List<ContactNotice> GetAll()
        {
            return _context.GetAll();
        }

        public ContactNotice GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(ContactNotice data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new ContactNotice { Id = id });
        }

        public void Update(ContactNotice data)
        {
            _context.Update(data);
        }
    }
}
