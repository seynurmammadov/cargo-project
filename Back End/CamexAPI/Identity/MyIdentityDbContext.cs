using Entity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CamexAPI.Identity
{
    public class MyIdentityDbContext:IdentityDbContext<AppUser>
    {
        public MyIdentityDbContext(DbContextOptions options) :base(options)
        {

        }
         public DbSet<City> Cities { get; set; }
         public DbSet<Office> Offices { get; set; }
         public DbSet<Balance> Balances { get; set; }
         public DbSet<OfficeNameTranlate> OfficeNameTranlates { get; set; }
         public DbSet<CityNameTranslate> CityNameTranslates { get; set; }
         public DbSet<Language> Languages { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
