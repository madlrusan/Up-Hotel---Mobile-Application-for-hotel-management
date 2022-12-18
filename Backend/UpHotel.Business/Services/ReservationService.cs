using UpHotel.Business.Commands;
using UpHotel.Business.Contracts;
using UpHotel.Business.Exceptions;
using UpHotel.Business.ViewModels;
using UpHotel.Data.Repositories.Contracts;

namespace UpHotel.Business.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IIdentityService _identityService;

        public ReservationService(IReservationRepository reservationRepository, IIdentityService identityService)
        {
            _reservationRepository = reservationRepository;
            _identityService = identityService;
        }

        public Task CheckIn(CheckInCommand cmd)
        {
            // TODO
            throw new NotImplementedException();
        }

        public async Task CheckOut(CheckoutCommand cmd)
        {
            var reservation = await _reservationRepository.GetReservationAsync(cmd.ReservationId);

            if (reservation == null) throw new ValidationException("Invalid reservation id!");

            reservation.IsActive = false;
            await _reservationRepository.SaveChangesAsync();
        }

        public Task<ICollection<RoomReservationViewModel>> GetReservations(bool includeInactive = false)
        {
            // TODO
            // TODO view model mapping
            throw new NotImplementedException();
        }
    }
}
