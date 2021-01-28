using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICountryAddressDescriptionService
    {
        CountryAddressDescription GetWithId(int id);
        List<CountryAddressDescription> GetAll();
        void Add(CountryAddressDescription data);
        void Update(CountryAddressDescription data);
        void Detele(int id);
    }
}
