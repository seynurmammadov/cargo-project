using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CamexAPI.Models
{
    public class Login
    {
        [Required(ErrorMessage = "User Name is required"),EmailAddress]
        [JsonPropertyName("username")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
