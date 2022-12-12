using UpHotel.Business.Commands;
using UpHotel.Business.ViewModels;

namespace UpHotel.Business.Contracts
{
    public interface IIdentityService
    {
        public Task<string> Login(LoginCommand model);
        public Task AddOrUpdateUser(AddOrUpdateUserViewModel model);
        public Task<IEnumerable<UserViewModel>> GetStaffUsers();
    }
}
