using Core.Repository.EntityFramework;
using DataAccess.Abstract;
using Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete
{
    public class EFOffice:EFRepositoryBase<Office,AppDbContext>,IOfficeDAL
    {
        public List<Office> GetAllNInclude(Expression<Func<Office, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Offices.Include(c => c.OfficeNameTranlates).ToList()
                    : context.Offices.Where(filter).Include(c => c.OfficeNameTranlates).ToList();
            };
        }
    }
}
