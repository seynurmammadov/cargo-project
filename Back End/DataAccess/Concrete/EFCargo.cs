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
    public class EFCargo : EFRepositoryBase<Cargo, AppDbContext>, ICargoDAL
    {
        public List<Cargo> GetAllNInclude(Expression<Func<Cargo, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Cargos.Include(c => c.Country).Include(c => c.Status).Include(p=>p.Product).ThenInclude(p=>p.ProductTranslates).ToList()
                    : context.Cargos.Where(filter).Include(c => c.Country).Include(c => c.Status).Include(p => p.Product).ThenInclude(p => p.ProductTranslates).ToList();
            };
        }
        public List<Cargo> GetAllNIncludeOffice(Expression<Func<Cargo, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Cargos.Include(c => c.Status).Include(o=>o.Office).ThenInclude(o=>o.OfficeNameTranlates).ToList()
                    : context.Cargos.Where(filter).Include(c => c.Status).Include(o => o.Office).ThenInclude(o => o.OfficeNameTranlates).ToList();
            };
        }
    }
}
