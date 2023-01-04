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
using UpHotel.Business.Commands;
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
        private readonly IEmailService _emailService;
        public IdentityService(UserManager<ApplicationUser> userManager, IOptions<JwtOptions> jwtOptions,
            ILogger<IdentityService> logger, RoleManager<IdentityRole> roleManager, IEmailService emailService)
        {
            _userManager = userManager;
            _jwtOptions = jwtOptions.Value;
            _logger = logger;
            _roleManager = roleManager;
            _emailService = emailService;
        }

        public async Task<string> Login(LoginCommand model)
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

        public async Task AddOrUpdateUser(AddOrUpdateUserCommand cmd)
        {
            if (!IsValidEmail(cmd.Email))
                throw new ValidationException("Please provide an email!");

            if (!cmd.Roles.Any())
                throw new ValidationException("Please provide atleast one role!");

            foreach (var role in cmd.Roles)
            {
                if (!(await _roleManager.RoleExistsAsync(role)))
                    throw new ValidationException($"Role {role} is not valid!");
            }


            var existingUser = await _userManager.FindByEmailAsync(cmd.Email);

            if (existingUser is null)
            {
                if (string.IsNullOrEmpty(cmd.FirstName) || string.IsNullOrEmpty(cmd.LastName))
                    throw new ValidationException("Please provide a valid name!");

                var newUser = new ApplicationUser()
                {
                    FirstName = cmd.FirstName,
                    LastName = cmd.LastName,
                    Email = cmd.Email,
                    UserName = cmd.Email,
                    EmailConfirmed = true,
                    PhoneNumber = cmd.PhoneNumber
                };

                var generatedPassword = GeneratePassword(16);
                var result = await _userManager.CreateAsync(newUser, generatedPassword);

                if (!result.Succeeded)
                {
                    throw new ValidationException(string.Join(", ", result.Errors.Select(p => p.Description)));
                }

                var rolesResult = await _userManager.AddToRolesAsync(newUser, cmd.Roles);

                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                    _logger.LogWarning($"Created user {cmd.Email} with password {generatedPassword}");
                else
                {
                    await _emailService.SendEmailAsync(cmd.Email, "UpHotel account information", GetAccountInformationEmailBody(newUser, generatedPassword));
                }

                _logger.LogInformation($"Roles [{string.Join(", ", cmd.Roles)}] added to user {cmd.Email}");

                return;

            }

            var userRoles = await _userManager.GetRolesAsync(existingUser);

            var rolesToBeRemoved = userRoles.Where(r => !cmd.Roles.Contains(r));

            if (rolesToBeRemoved.Any())
            {
                await _userManager.RemoveFromRolesAsync(existingUser, rolesToBeRemoved);

                _logger.LogWarning($"Removing roles {string.Join(", ", rolesToBeRemoved)} from user {cmd.Email}");
            }

            var rolesToBeAdded = cmd.Roles.Where(r => !userRoles.Contains(r));

            if (rolesToBeAdded.Any())
            {
                await _userManager.AddToRolesAsync(existingUser, rolesToBeRemoved);

                _logger.LogInformation($"Adding roles {string.Join(", ", rolesToBeRemoved)} to user {cmd.Email}");
            }

        }

        public async Task<IEnumerable<UserViewModel>> GetStaffUsers()
        {
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            var housekeepingUsers = await _userManager.GetUsersInRoleAsync("Housekeeping");
            var receptionUsers = await _userManager.GetUsersInRoleAsync("Reception");

            var users = admins.Select(a => new UserViewModel() { FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, Role = "Admin" });
            users = users.Concat(housekeepingUsers.Select(a => new UserViewModel() { FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, Role = "Housekeeping" }));
            users = users.Concat(receptionUsers.Select(a => new UserViewModel() { FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, Role = "Reception" }));

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

        private string GetAccountInformationEmailBody(ApplicationUser user, string password)
        {
            return @$"<h2>Hello {user.FirstName + " " + user.LastName},</h2>
                <p>Your password for the UpHotel account is: <b>{password}</b></p>";
        }

    }
}
