using Microsoft.AspNetCore.Identity;
using UpHotel.Business.Commands;
using UpHotel.Business.Contracts;
using UpHotel.Business.Exceptions;
using UpHotel.Business.ViewModels;
using UpHotel.Data.Entities;
using UpHotel.Data.Repositories.Contracts;

namespace UpHotel.Business.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IIdentityService _identityService;
        private readonly UserManager<ApplicationUser> _userManager;

        public ReservationService(IReservationRepository reservationRepository, IIdentityService identityService, IRoomRepository roomRepository, UserManager<ApplicationUser> userManager)
        {
            _reservationRepository = reservationRepository;
            _identityService = identityService;
            _roomRepository = roomRepository;
            _userManager = userManager;
        }

        public async Task CheckIn(CheckInCommand cmd)
        {
            if (cmd.StartDate < DateTime.Now) throw new ValidationException("Cannot create a reservation with a past start date!");
            if (cmd.EndDate < DateTime.Now) throw new ValidationException("Cannot create a reservation with a past end date!");

            if (cmd.RoomId <= 0) throw new ValidationException("Invalid room id!");

            var room = await _roomRepository.GetRoomAsync(cmd.RoomId);
            if (room is null) throw new ValidationException("Invalid room id!");

            var userCreationCmd = new AddOrUpdateUserCommand()
            {
                Email = cmd.EmailAddress,
                FirstName = cmd.FirstName,
                LastName = cmd.LastName,
                PhoneNumber = cmd.PhoneNumber,
                Roles = new List<string>() { "Room" }
            };

            await _identityService.AddOrUpdateUser(userCreationCmd);

            var user = await _userManager.FindByEmailAsync(cmd.EmailAddress);

            var reservation = new RoomReservation() { IsActive = true, RoomId = cmd.RoomId, UserId = user.Id, StartDate = cmd.StartDate, EndDate = cmd.EndDate };

            await _reservationRepository.AddReservationAsync(reservation);
        }

        public async Task CheckOut(CheckoutCommand cmd)
        {
            var reservation = await _reservationRepository.GetReservationAsync(cmd.ReservationId);

            if (reservation == null) throw new ValidationException("Invalid reservation id!");

            reservation.IsActive = false;
            await _reservationRepository.SaveChangesAsync();
        }

        public async Task<ICollection<RoomReservationViewModel>> GetReservations(bool includeInactive = false)
        {
            var reservations = await _reservationRepository.GetReservationsAsync(includeInactive);

            return reservations.Select(r => GetReservationVm(r)).ToList();
        }

        public RoomReservationViewModel GetReservationVm(RoomReservation reservation)
        {
            return new RoomReservationViewModel()
            {
                Id = reservation.Id,
                IsActive = reservation.IsActive,
                StartDate = reservation.StartDate,
                EndDate = reservation.EndDate,
                Room = new RoomViewModel() { Id = reservation.Room.Id,  Name = reservation.Room.Name, Status = reservation.Room.RoomStatus},
                User = new UserViewModel() { 
                    FirstName = reservation.User.FirstName,
                    LastName = reservation.User.LastName, 
                    Email = reservation.User.Email, 
                    Role = "Room", 
                    PhoneNumber = reservation.User.PhoneNumber 
                },
            };
        }
    }
}
