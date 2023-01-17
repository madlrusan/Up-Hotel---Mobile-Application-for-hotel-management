using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
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
            if (cmd.RoomId <= 0) throw new ValidationException("Invalid room id!");

            var room = await _roomRepository.GetRoomAsync(cmd.RoomId);
            if (room is null) throw new ValidationException("Invalid room id!");

            var userCreationCmd = new AddOrUpdateUserCommand()
            {
                Email = cmd.EmailAddress,
                FirstName = cmd.FirstName,
                LastName = cmd.LastName,
                Role = "Room"
            };

            await _identityService.AddOrUpdateUser(userCreationCmd);

            var user = await _userManager.FindByEmailAsync(cmd.EmailAddress);

            room.RoomStatus = RoomStatus.Occupied;
            room.UserId = user.Id;

            await _roomRepository.SaveChangesAsync();
        }

        public async Task CheckOut(CheckoutCommand cmd)
        {
            var room = await _roomRepository.GetRoomAsync(cmd.RoomId);

            if (room == null) throw new ValidationException("Invalid room id!");

            room.RoomStatus = RoomStatus.Empty;
            room.UserId = null;
            await _roomRepository.SaveChangesAsync();
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
                    Role = "Room"
                },
            };
        }
    }
}
