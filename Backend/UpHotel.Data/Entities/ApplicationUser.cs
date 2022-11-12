using Microsoft.AspNetCore.Identity;

namespace UpHotel.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime CreatedAtTimeUtc { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
