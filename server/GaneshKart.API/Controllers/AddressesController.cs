using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.DTOs;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressesController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public AddressesController(GaneshKartDbContext context)
        {
            _context = context;
        }

        private int GetTargetUserId(int? queryUserId)
        {
            if (queryUserId.HasValue && queryUserId.Value > 0)
                return queryUserId.Value;

            if (Request.Headers.TryGetValue("X-User-Id", out var headerVal) && int.TryParse(headerVal, out int uid) && uid > 0)
                return uid;

            return 0;
        }

        /// <summary>
        /// Get all saved addresses for current user
        /// GET /api/addresses?userId=123
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses([FromQuery] int? userId)
        {
            int targetUserId = GetTargetUserId(userId);
            if (targetUserId <= 0)
            {
                return Ok(new List<Address>());
            }

            var addresses = await _context.Addresses
                .Where(a => a.UserId == targetUserId)
                .OrderByDescending(a => a.IsDefault)
                .ThenByDescending(a => a.CreatedDate)
                .ToListAsync();

            return Ok(addresses);
        }

        /// <summary>
        /// Add a new address
        /// POST /api/addresses?userId=123
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Address>> AddAddress([FromBody] CreateAddressDto dto, [FromQuery] int? userId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            int targetUserId = GetTargetUserId(userId);
            if (targetUserId <= 0)
            {
                var firstUser = await _context.Users.FirstOrDefaultAsync();
                targetUserId = firstUser?.Id ?? 1;
            }

            if (dto.IsDefault)
            {
                var existingAddresses = await _context.Addresses.Where(a => a.UserId == targetUserId).ToListAsync();
                foreach (var addr in existingAddresses)
                {
                    addr.IsDefault = false;
                }
            }

            var newAddress = new Address
            {
                UserId = targetUserId,
                FullName = dto.FullName,
                MobileNumber = dto.MobileNumber,
                Pincode = dto.Pincode,
                AddressLine = dto.AddressLine,
                City = dto.City,
                State = dto.State,
                Landmark = dto.Landmark,
                AddressType = dto.AddressType,
                IsDefault = dto.IsDefault,
                CreatedDate = DateTime.UtcNow
            };

            _context.Addresses.Add(newAddress);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAddresses), new { id = newAddress.Id }, newAddress);
        }

        /// <summary>
        /// Delete address
        /// DELETE /api/addresses/{id}?userId=123
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteAddress(int id, [FromQuery] int? userId)
        {
            int targetUserId = GetTargetUserId(userId);

            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id && (targetUserId <= 0 || a.UserId == targetUserId));
            if (address != null)
            {
                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Address deleted successfully." });
        }
    }
}
