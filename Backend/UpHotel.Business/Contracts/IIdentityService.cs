using UpHotel.Business.ViewModels;

namespace UpHotel.Business.Contracts
{
    public interface IIdentityService
    {
        public Task<string> Login(LoginViewModel model);
        public Task AddOrUpdateUser(AddOrUpdateUserViewModel model);
    }
}
