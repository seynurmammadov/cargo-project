using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class NoticeTranslateManager:INoticeTranslateService
    {
        private readonly INoticeTranslateDAL _context;

        public NoticeTranslateManager(INoticeTranslateDAL context)
        {
            _context = context;
        }

        public List<NoticeTranslate> GetAll()
        {
            return _context.GetAll();
        }

        public NoticeTranslate GetWithId(int id)
        {
            return _context.Get(c => c.Id == id);
        }

        public void Add(NoticeTranslate data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new NoticeTranslate { Id = id });
        }

        public void Update(NoticeTranslate data)
        {
            _context.Update(data);
        }
    }
}
