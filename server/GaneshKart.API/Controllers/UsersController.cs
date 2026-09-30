using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.DTOs;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public UsersController(GaneshKartDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get active/demo user profile
        /// GET /api/users/current
        /// </summary>
        [HttpGet("current")]
        public async Task<ActionResult<UserResponseDto>> GetCurrentUser()
        {
            var user = await _context.Users.FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role
            });
        }

        /// <summary>
        /// User login (for demo, matches user or creates session)
        /// POST /api/users/login
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<UserResponseDto>> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());
            if (user == null)
            {
                user = await _context.Users.FirstOrDefaultAsync();
                if (user == null) return Unauthorized(new { message = "Invalid email or password." });
            }

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role
            });
        }

        /// <summary>
        /// Dedicated Admin Login (ID: 8668811021, Password: Admin123!)
        /// POST /api/users/admin-login
        /// </summary>
        [HttpPost("admin-login")]
        public async Task<ActionResult<UserResponseDto>> AdminLogin([FromBody] AdminLoginDto dto)
        {
            var adminId = dto.AdminId?.Trim() ?? string.Empty;
            var password = dto.Password?.Trim() ?? string.Empty;

            if (adminId != "8668811021" || password != "Admin123!")
            {
                return Unauthorized(new { message = "Invalid Admin ID or Password. Only authorized administrator can log in." });
            }

            var admin = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == "8668811021" || u.Role == "Admin");
            if (admin == null)
            {
                admin = new User
                {
                    FullName = "Ganesh Sawant (Admin)",
                    PhoneNumber = "8668811021",
                    Email = "admin@ganeshkart.com",
                    PasswordHash = "Admin123!",
                    Role = "Admin",
                    CreatedDate = DateTime.UtcNow
                };
                _context.Users.Add(admin);
                await _context.SaveChangesAsync();
            }

            return Ok(new UserResponseDto
            {
                Id = admin.Id,
                FullName = admin.FullName,
                Email = admin.Email,
                PhoneNumber = admin.PhoneNumber,
                Role = "Admin"
            });
        }

        /// <summary>
        /// Customer Login or Auto-Register by Phone or Email
        /// POST /api/users/customer-auth
        /// </summary>
        [HttpPost("customer-auth")]
        public async Task<ActionResult<UserResponseDto>> CustomerAuth([FromBody] CustomerAuthDto dto)
        {
            var phone = dto.PhoneNumber?.Trim() ?? string.Empty;
            var email = dto.Email?.Trim() ?? string.Empty;

            User? user = null;

            if (!string.IsNullOrEmpty(phone))
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phone);
            }
            if (user == null && !string.IsNullOrEmpty(email))
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
            }

            if (user == null)
            {
                // Create brand new customer in SQL Server database
                string displayName = !string.IsNullOrWhiteSpace(dto.FullName)
                    ? dto.FullName.Trim()
                    : (!string.IsNullOrEmpty(phone) ? $"Customer {phone.Substring(Math.Max(0, phone.Length - 4))}" : "GaneshKart Customer");

                string userEmail = !string.IsNullOrEmpty(email)
                    ? email
                    : (!string.IsNullOrEmpty(phone) ? $"{phone}@customer.ganeshkart.com" : $"customer_{DateTime.UtcNow.Ticks}@ganeshkart.com");

                user = new User
                {
                    FullName = displayName,
                    PhoneNumber = phone,
                    Email = userEmail,
                    PasswordHash = "CustomerOTP",
                    Role = "Customer",
                    CreatedDate = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                _context.Cart.Add(new Cart { UserId = user.Id });
                await _context.SaveChangesAsync();
            }

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role
            });
        }

        /// <summary>
        /// Get all registered customers (for Admin view)
        /// GET /api/users/customers
        /// </summary>
        [HttpGet("customers")]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetCustomers()
        {
            var customers = await _context.Users
                .Where(u => u.Role == "Customer")
                .OrderByDescending(u => u.CreatedDate)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    Role = u.Role
                })
                .ToListAsync();

            return Ok(customers);
        }

        /// <summary>
        /// User registration
        /// POST /api/users/register
        /// </summary>
        [HttpPost("register")]
        public async Task<ActionResult<UserResponseDto>> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existing = await _context.Users.AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower());
            if (existing)
            {
                return BadRequest(new { message = "An account with this email address already exists." });
            }

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                PasswordHash = "Hashed_" + dto.Password.GetHashCode(),
                Role = "Customer"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Also create an empty cart for this user
            _context.Cart.Add(new Cart { UserId = user.Id });
            await _context.SaveChangesAsync();

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role
            });
        }

        /// <summary>
        /// Get user by ID with addresses
        /// GET /api/users/{id}
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetUserProfile(int id)
        {
            var user = await _context.Users
                .Include(u => u.Addresses)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return NotFound(new { message = "User not found." });

            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.PhoneNumber,
                user.Role,
                user.CreatedDate,
                Addresses = user.Addresses
            });
        }
    }
}
