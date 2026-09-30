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
                // For educational/learning ease, if user enters demo credentials, return the demo user
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
