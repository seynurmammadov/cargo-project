using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IMessageUserService
    {
        MessageUser GetWithId(int id);
        List<MessageUser> GetAll();
        void Add(MessageUser data);
        void Update(MessageUser data);
        void Detele(int id);
    }
  
}
