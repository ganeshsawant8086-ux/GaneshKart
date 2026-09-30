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

        private async Task<int> GetCurrentUserIdAsync()
        {
            var user = await _context.Users.FirstOrDefaultAsync();
            return user?.Id ?? 1;
        }

        /// <summary>
        /// Get all saved addresses for current user
        /// GET /api/addresses
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
        {
            int userId = await GetCurrentUserIdAsync();

            var addresses = await _context.Addresses
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.IsDefault)
                .ThenByDescending(a => a.CreatedDate)
                .ToListAsync();

            return Ok(addresses);
        }

        /// <summary>
        /// Add a new address
        /// POST /api/addresses
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Address>> AddAddress([FromBody] CreateAddressDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            int userId = await GetCurrentUserIdAsync();

            if (dto.IsDefault)
            {
                var existingAddresses = await _context.Addresses.Where(a => a.UserId == userId).ToListAsync();
                foreach (var addr in existingAddresses)
                {
                    addr.IsDefault = false;
                }
            }

            var newAddress = new Address
            {
                UserId = userId,
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
        /// DELETE /api/addresses/{id}
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteAddress(int id)
        {
            int userId = await GetCurrentUserIdAsync();

            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
            if (address != null)
            {
                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Address deleted successfully." });
        }
    }
}
