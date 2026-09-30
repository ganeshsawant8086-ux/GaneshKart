using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.DTOs;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public CartController(GaneshKartDbContext context)
        {
            _context = context;
        }

        // Helper to obtain default user ID for demo/educational purposes
        private async Task<int> GetCurrentUserIdAsync()
        {
            var user = await _context.Users.FirstOrDefaultAsync();
            return user?.Id ?? 1;
        }

        // Helper to get or create Cart for user
        private async Task<Cart> GetOrCreateCartAsync(int userId)
        {
            var cart = await _context.Cart
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Cart.Add(cart);
                await _context.SaveChangesAsync();
            }

            return cart;
        }

        /// <summary>
        /// Get cart details with calculations (subtotal, discount, delivery charges, final amount)
        /// GET /api/cart
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<CartSummaryResponseDto>> GetCart()
        {
            int userId = await GetCurrentUserIdAsync();
            var cart = await GetOrCreateCartAsync(userId);

            var items = cart.CartItems.Select(ci => new CartItemResponseDto
            {
                Id = ci.Id,
                CartId = ci.CartId,
                ProductId = ci.ProductId,
                ProductName = ci.Product?.Name ?? string.Empty,
                ProductImageUrl = ci.Product?.ImageUrl ?? string.Empty,
                Category = ci.Product?.Category ?? string.Empty,
                Brand = ci.Product?.Brand ?? string.Empty,
                Price = ci.Product?.Price ?? 0,
                DiscountPrice = ci.Product?.DiscountPrice ?? 0,
                Quantity = ci.Quantity
            }).ToList();

            decimal originalTotal = items.Sum(i => i.Price * i.Quantity);
            decimal discountTotal = items.Sum(i => i.DiscountPrice * i.Quantity);
            decimal totalSavings = originalTotal - discountTotal;
            // Delivery charge: Free if cart > 500, else 40 Rs; 0 if empty
            decimal deliveryCharge = (discountTotal > 500 || items.Count == 0) ? 0 : 40;
            decimal finalAmount = items.Count > 0 ? (discountTotal + deliveryCharge) : 0;

            var summary = new CartSummaryResponseDto
            {
                CartId = cart.Id,
                TotalItems = items.Sum(i => i.Quantity),
                OriginalTotal = originalTotal,
                DiscountTotal = discountTotal,
                TotalSavings = totalSavings,
                DeliveryCharge = deliveryCharge,
                FinalAmount = finalAmount,
                Items = items
            };

            return Ok(summary);
        }

        /// <summary>
        /// Add item to cart or increment quantity if exists
        /// POST /api/cart
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> AddToCart([FromBody] AddToCartDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
            {
                return NotFound(new { message = $"Product {dto.ProductId} not found." });
            }

            int userId = await GetCurrentUserIdAsync();
            var cart = await GetOrCreateCartAsync(userId);

            var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == dto.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += dto.Quantity;
                if (existingItem.Quantity > 10) existingItem.Quantity = 10; // Max per customer
            }
            else
            {
                var newItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                };
                _context.CartItems.Add(newItem);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Item successfully added to cart." });
        }

        /// <summary>
        /// Update quantity of an item in cart
        /// PUT /api/cart/{id} (where id is CartItemId)
        /// </summary>
        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateQuantity(int id, [FromBody] UpdateCartItemDto dto)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound(new { message = $"Cart item {id} not found." });
            }

            if (dto.Quantity <= 0)
            {
                _context.CartItems.Remove(cartItem);
            }
            else
            {
                cartItem.Quantity = Math.Min(dto.Quantity, 10);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Cart item quantity updated." });
        }

        /// <summary>
        /// Remove item from cart
        /// DELETE /api/cart/{id}
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> RemoveCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound(new { message = $"Cart item {id} not found." });
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item removed from cart." });
        }

        /// <summary>
        /// Clear all items in cart
        /// DELETE /api/cart/clear
        /// </summary>
        [HttpDelete("clear")]
        public async Task<ActionResult> ClearCart()
        {
            int userId = await GetCurrentUserIdAsync();
            var cart = await GetOrCreateCartAsync(userId);

            if (cart.CartItems.Any())
            {
                _context.CartItems.RemoveRange(cart.CartItems);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Cart cleared successfully." });
        }
    }
}
