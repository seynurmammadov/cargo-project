using Entity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Concrete
{
    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-BJ9GPJO;Database=Camex;Trusted_Connection=True;MultipleActiveResultSets=True");
        }
        public DbSet<BusinessCustomer> BusinessCustomers { get; set; }
        public DbSet<PrivateCustomer> PrivateCustomers { get; set; }
        public DbSet<Citizenship> Сitizenships { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Office> Offices { get; set; }
        public DbSet<Balance> Balances { get; set; }
        public DbSet<OfficeNameTranlate> OfficeNameTranlates { get; set; }
        public DbSet<CityNameTranslate> CityNameTranslates { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<CountryAddressDescription> CountryAddressDescriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
          
            modelBuilder.Entity<Citizenship>().HasData(
                new Citizenship
                {
                    Id = 1,
                    Name = "Azerbaycanli",
                }
                );
        }

    }
}
