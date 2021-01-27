using Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface ICountryAddressDescriptionService
    {
        CountryAddressDescription GetCountryAddressDescriptionWithId(int id);
        List<CountryAddressDescription> GetAllCountryAddressDescriptions();
        void Add(CountryAddressDescription data);
        void Update(CountryAddressDescription data);
        void Detele(int id);
    }
}
