using Business.Abstract;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class MessageUserManager:IMessageUserService
    {
        private readonly IMessageUserDAL _context;

        public MessageUserManager(IMessageUserDAL context)
        {
            _context = context;
        }

        public List<MessageUser> GetAll()
        {
            return _context.GetAll(m=>!m.IsDeleted);
        }

        public MessageUser GetWithId(int id)
        {
            return _context.Get(m => !m.IsDeleted && m.Id == id);
        }

        public void Add(MessageUser data)
        {
            _context.Add(data);
        }

        public void Detele(int id)
        {
            _context.Delete(new MessageUser { Id = id });
        }

        public void Update(MessageUser data)
        {
            _context.Update(data);
        }
    }
}

