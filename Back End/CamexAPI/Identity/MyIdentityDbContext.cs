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
         public DbSet<OfficeNameTranslate> OfficeNameTranslates { get; set; }
         public DbSet<CityNameTranslate> CityNameTranslates { get; set; }
         public DbSet<Language> Languages { get; set; }
         public DbSet<Cargo> Cargos { get; set; }
         public DbSet<Status> Status { get; set; }
         public DbSet<Order> Orders { get; set; }
         public DbSet<Receipt> Receipts { get; set; }
         public DbSet<Country> Countries { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
