using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using UpHotel.Business.Contracts;
using UpHotel.Business.Exceptions;
using UpHotel.Business.Options;
using UpHotel.Business.ViewModels;
using UpHotel.Data.Entities;

namespace UpHotel.Business.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtOptions _jwtOptions;
        private readonly ILogger<IdentityService> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;
        public IdentityService(UserManager<ApplicationUser> userManager, IOptions<JwtOptions> jwtOptions, 
            ILogger<IdentityService> logger, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _jwtOptions = jwtOptions.Value;
            _logger = logger;
            _roleManager = roleManager;
        }

        public async Task<string> Login(LoginViewModel model)
        {
            if (!IsValidEmail(model.Email))
                throw new ValidationException("Please provide an email!");

            if (string.IsNullOrWhiteSpace(model.Password))
                throw new ValidationException("Please provide a password!");

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                throw new ValidationException("User does not exist or wrong password!");

            var isValidPassword = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!isValidPassword)
                throw new ValidationException("User does not exist or wrong password!");

            var roles = await _userManager.GetRolesAsync(user);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtOptions.Secret);
            var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName)
                };
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task AddOrUpdateUser(AddOrUpdateUserViewModel model)
        {
            if (!IsValidEmail(model.Email))
                throw new ValidationException("Please provide an email!");

            if (!model.Roles.Any())
                throw new ValidationException("Please provide atleast one role!");

            foreach (var role in model.Roles)
            {
                if (!(await _roleManager.RoleExistsAsync(role)))
                    throw new ValidationException($"Role {role} is not valid!");
            }


            var existingUser = await _userManager.FindByEmailAsync(model.Email);

            if (existingUser is null)
            {
                if (string.IsNullOrEmpty(model.FirstName) || string.IsNullOrEmpty(model.LastName))
                    throw new ValidationException("Please provide a valid name!");

                var newUser = new ApplicationUser()
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    UserName = model.Email,
                    EmailConfirmed = true
                };

                var generatedPassword = GeneratePassword(16);
                var result = await _userManager.CreateAsync(newUser, generatedPassword);

                if (!result.Succeeded)
                {
                    throw new ValidationException(string.Join(", ", result.Errors.Select(p => p.Description)));
                }

                var rolesResult = await _userManager.AddToRolesAsync(newUser, model.Roles);

                // send email here
                _logger.LogWarning($"Created user {model.Email} with password {generatedPassword}");
                _logger.LogInformation($"Roles [{string.Join(", ", model.Roles)}] added to user {model.Email}");

                return;

            }

            var userRoles = await _userManager.GetRolesAsync(existingUser);

            var rolesToBeRemoved = userRoles.Where(r => !model.Roles.Contains(r));

            if (rolesToBeRemoved.Any())
            {
                await _userManager.RemoveFromRolesAsync(existingUser, rolesToBeRemoved);

                _logger.LogWarning($"Removing roles {string.Join(", ", rolesToBeRemoved)} from user {model.Email}");
            }

            var rolesToBeAdded = model.Roles.Where(r => !userRoles.Contains(r));

            if (rolesToBeAdded.Any())
            {
                await _userManager.AddToRolesAsync(existingUser, rolesToBeRemoved);

                _logger.LogInformation($"Adding roles {string.Join(", ", rolesToBeRemoved)} to user {model.Email}");
            }

        }

        public async Task<IEnumerable<UserViewModel>> GetStaffUsers()
        {
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            var housekeepingUsers = await _userManager.GetUsersInRoleAsync("Housekeeping");

            var users = admins.Select(a => new UserViewModel() { FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, Role = "Admin" });
            users = users.Concat(housekeepingUsers.Select(a => new UserViewModel() { FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, Role = "Housekeeping" }));

            return users;
        }

        private bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        private string GeneratePassword(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&?%$@";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[(new Random()).Next(s.Length)]).ToArray());
        }

    }
}
