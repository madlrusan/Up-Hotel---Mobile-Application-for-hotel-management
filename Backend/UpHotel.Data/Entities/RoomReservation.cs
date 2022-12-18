using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UpHotel.Data.Entities
{
    public class RoomReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int RoomId { get; set; }
        public string UserId { get;set; }
        public Room? Room { get; set; }
        public ApplicationUser? User { get; set; }
        public bool IsActive { get; set; } = false;

    }
}
