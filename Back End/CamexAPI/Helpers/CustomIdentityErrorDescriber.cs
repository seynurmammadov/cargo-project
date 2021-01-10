using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackProject.Helpers
{
    public class CustomIdentityErrorDescriber: IdentityErrorDescriber
    {
        public override IdentityError DuplicateEmail(string email)
        {
            return new IdentityError()
            {
                Code = nameof(DuplicateEmail),
                Description = "Bu email artiq movcuddur,zehmet olmasa basqa email daxil edin!"
            };
        }

    }
}
