using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Data.Entities;

namespace UpHotel.Business.ViewModels
{
    public class RoomViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public RoomStatus Status { get; set; }
        public UserViewModel User { get; set; }
    }
}
