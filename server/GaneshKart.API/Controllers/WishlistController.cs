using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.DTOs;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public WishlistController(GaneshKartDbContext context)
        {
            _context = context;
        }

        private async Task<int> GetCurrentUserIdAsync()
        {
            var user = await _context.Users.FirstOrDefaultAsync();
            return user?.Id ?? 1;
        }

        /// <summary>
        /// Get all items in user's wishlist
        /// GET /api/wishlist
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetWishlist()
        {
            int userId = await GetCurrentUserIdAsync();

            var wishlistItems = await _context.Wishlist
                .Where(w => w.UserId == userId)
                .Include(w => w.Product)
                .OrderByDescending(w => w.AddedDate)
                .Select(w => new
                {
                    w.Id,
                    w.ProductId,
                    w.AddedDate,
                    Product = w.Product
                })
                .ToListAsync();

            return Ok(wishlistItems);
        }

        /// <summary>
        /// Add product to wishlist
        /// POST /api/wishlist
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> AddToWishlist([FromBody] AddToWishlistDto dto)
        {
            int userId = await GetCurrentUserIdAsync();

            var existing = await _context.Wishlist
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == dto.ProductId);

            if (existing != null)
            {
                return Ok(new { message = "Item already in wishlist." });
            }

            var item = new Wishlist
            {
                UserId = userId,
                ProductId = dto.ProductId,
                AddedDate = DateTime.UtcNow
            };

            _context.Wishlist.Add(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item added to wishlist." });
        }

        /// <summary>
        /// Remove product from wishlist
        /// DELETE /api/wishlist/{productId}
        /// </summary>
        [HttpDelete("{productId:int}")]
        public async Task<ActionResult> RemoveFromWishlist(int productId)
        {
            int userId = await GetCurrentUserIdAsync();

            var item = await _context.Wishlist
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

            if (item != null)
            {
                _context.Wishlist.Remove(item);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Item removed from wishlist." });
        }
    }

    public class AddToWishlistDto
    {
        public int ProductId { get; set; }
    }
}
