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
        List<Cargo> GetAllActive(string str);
        List<Cargo> GetAllActiveStatement(string id);
        List<Cargo> GetAllActiveUser(string id);
        List<Cargo> GetAllActiveUserInvoice(string id,string str);
        List<Cargo> GetAllActiveUserParcels(string id,string str);

        Cargo GetWithIdInclude(int id);

        void Add(Cargo data);
        void Update(Cargo data);
        void Detele(int id);
    }
}
