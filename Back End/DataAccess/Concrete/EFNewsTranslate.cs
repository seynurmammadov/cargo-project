﻿using Core.Repository.EntityFramework;
using DataAccess.Abstract;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete
{
    public class EFNewsTranslate : EFRepositoryBase<NewsTranslate, AppDbContext>, INewsTranslateDAL
    {
    }
}
