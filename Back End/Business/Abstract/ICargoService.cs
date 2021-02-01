using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICargoService
    {
        Cargo GetWithId(int id);
        List<Cargo> GetAll();
        List<Cargo> GetAllActiveStatement(string id);
        List<Cargo> GetAllActiveWaitingInvoice(string id);
        List<Cargo> GetAllActiveInAnbar(string id);
        
        void Add(Cargo data);
        void Update(Cargo data);
        void Detele(int id);
    }
}
