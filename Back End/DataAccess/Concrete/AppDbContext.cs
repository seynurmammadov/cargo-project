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
        public DbSet<OfficeNameTranslate> OfficeNameTranslates { get; set; }
        public DbSet<CityNameTranslate> CityNameTranslates { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<CountryAddressDescription> CountryAddressDescriptions { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductTranslate> ProductTranslate { get; set; }
        public DbSet<NoticeTranslate> NoticeTranslates { get; set; }
        public DbSet<Cargo> Cargos { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Receipt> Receipts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
