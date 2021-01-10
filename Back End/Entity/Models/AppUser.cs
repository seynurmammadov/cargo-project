﻿using Core.Interfaces;
using Entity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entity.Models
{
    public class AppUser:IdentityUser,IEntity
    {
        public int CamexId { get; set; }
        public Balance Balance { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public string Address { get; set; }
        public int OfficeId { get; set; }
        public virtual Office Office { get; set; }
        public string Image { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }
        public bool IsTermsAccepted { get; set; }
        public bool IsActived { get; set; }

    }
}