using Entity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CamexAPI.Identity
{
    public class MyIdentityDbContext : IdentityDbContext<AppUser>
    {
        public MyIdentityDbContext(DbContextOptions<MyIdentityDbContext> options):base(options)
        {

        }
    }
}
