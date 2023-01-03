using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UpHotel.Business.ViewModels
{
    public class RoomReservationViewModel
    {
        public RoomViewModel Room { get; set; }
        public UserViewModel User { get; set; }
        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Id { get; set; }
    }
}
