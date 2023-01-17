
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UpHotel.Data.Entities
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public RoomStatus RoomStatus { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }

    }
}
