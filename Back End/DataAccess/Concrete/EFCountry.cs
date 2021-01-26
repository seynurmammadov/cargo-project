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
    public class EFCountry : EFRepositoryBase<Country, AppDbContext>, ICountryDAL
    {
        public List<Country> GetAllNInclude(Expression<Func<Country, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Countries.Include(c => c.CountryAddressDescriptions).ToList()
                    : context.Countries.Where(filter).Include(c => c.CountryAddressDescriptions).ToList();
            };
        }
        public Country GetNInclude(Expression<Func<Country, bool>> filter = null)
        {
            using (var context = new AppDbContext())
            {
                return filter == null
                    ? context.Countries.Include(c => c.CountryAddressDescriptions).FirstOrDefault()
                    : context.Countries.Where(filter).Include(c => c.CountryAddressDescriptions).FirstOrDefault();
            };
        }
    }
}
