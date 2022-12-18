using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UpHotel.Business.Commands;
using UpHotel.Business.ViewModels;

namespace UpHotel.Business.Contracts
{
    public interface IReservationService
    {
        Task CheckIn(CheckInCommand cmd);
        Task CheckOut(CheckoutCommand cmd);
        Task<ICollection<RoomReservationViewModel>> GetReservations(bool includeInactive = false);
    }
}
