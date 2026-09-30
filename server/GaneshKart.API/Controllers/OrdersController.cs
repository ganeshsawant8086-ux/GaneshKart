using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.DTOs;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public OrdersController(GaneshKartDbContext context)
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
        /// Get orders for current logged-in customer ONLY
        /// GET /api/orders?userId=123&phone=9876543210
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery] int? userId, [FromQuery] string? phone)
        {
            int targetUserId = GetTargetUserId(userId);
            string targetPhone = phone?.Trim() ?? string.Empty;

            if (string.IsNullOrEmpty(targetPhone) && Request.Headers.TryGetValue("X-User-Phone", out var phoneHeader))
            {
                targetPhone = phoneHeader.ToString().Trim();
            }

            // A customer must only see their own orders! If unauthenticated, return empty list
            if (targetUserId <= 0 && string.IsNullOrEmpty(targetPhone))
            {
                return Ok(new List<Order>());
            }

            var query = _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payments)
                .AsQueryable();

            if (targetUserId > 0 && !string.IsNullOrEmpty(targetPhone))
            {
                query = query.Where(o => o.UserId == targetUserId || o.PhoneNumber == targetPhone);
            }
            else if (targetUserId > 0)
            {
                query = query.Where(o => o.UserId == targetUserId);
            }
            else
            {
                query = query.Where(o => o.PhoneNumber == targetPhone);
            }

            var orders = await query
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(orders);
        }

        /// <summary>
        /// Get all customer orders for Admin Panel ONLY
        /// GET /api/orders/all
        /// </summary>
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrdersForAdmin()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payments)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(orders);
        }

        /// <summary>
        /// Get single order by id
        /// GET /api/orders/{id}
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payments)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = $"Order with ID {id} not found." });
            }

            return Ok(order);
        }

        /// <summary>
        /// Create a new order (from cart or direct buy-now items)
        /// POST /api/orders
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] CreateOrderDto dto, [FromQuery] int? userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int targetUserId = dto.UserId ?? GetTargetUserId(userId);
            if (targetUserId <= 0 && !string.IsNullOrWhiteSpace(dto.PhoneNumber))
            {
                var matchedUser = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == dto.PhoneNumber.Trim());
                if (matchedUser != null)
                {
                    targetUserId = matchedUser.Id;
                }
            }
            if (targetUserId <= 0)
            {
                var firstUser = await _context.Users.FirstOrDefaultAsync();
                targetUserId = firstUser?.Id ?? 1;
            }

            var orderItems = new List<OrderItem>();
            decimal originalTotal = 0;
            decimal discountTotal = 0;

            if (dto.DirectItems != null && dto.DirectItems.Any())
            {
                // Direct Buy-Now flow
                foreach (var item in dto.DirectItems)
                {
                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product != null)
                    {
                        originalTotal += product.Price * item.Quantity;
                        discountTotal += product.DiscountPrice * item.Quantity;

                        orderItems.Add(new OrderItem
                        {
                            ProductId = product.Id,
                            ProductName = product.Name,
                            ProductImageUrl = product.ImageUrl,
                            UnitPrice = product.DiscountPrice,
                            Quantity = item.Quantity,
                            TotalPrice = product.DiscountPrice * item.Quantity
                        });
                    }
                }
            }
            else
            {
                // From Cart flow
                var cart = await _context.Cart
                    .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Product)
                    .FirstOrDefaultAsync(c => c.UserId == targetUserId || c.UserId == 1);

                if (cart != null && cart.CartItems.Any())
                {
                    foreach (var ci in cart.CartItems)
                    {
                        if (ci.Product != null)
                        {
                            originalTotal += ci.Product.Price * ci.Quantity;
                            discountTotal += ci.Product.DiscountPrice * ci.Quantity;

                            orderItems.Add(new OrderItem
                            {
                                ProductId = ci.Product.Id,
                                ProductName = ci.Product.Name,
                                ProductImageUrl = ci.Product.ImageUrl,
                                UnitPrice = ci.Product.DiscountPrice,
                                Quantity = ci.Quantity,
                                TotalPrice = ci.Product.DiscountPrice * ci.Quantity
                            });
                        }
                    }

                    // Clear cart after checkout
                    _context.CartItems.RemoveRange(cart.CartItems);
                }
            }

            if (!orderItems.Any())
            {
                return BadRequest(new { message = "No valid products found for order." });
            }

            decimal deliveryCharge = discountTotal > 500 ? 0 : 40;
            decimal finalAmount = discountTotal + deliveryCharge;
            decimal totalDiscount = originalTotal - discountTotal;

            string fullAddress = $"{dto.ShippingAddress}, {dto.City}, {dto.State} - {dto.Pincode}";

            var order = new Order
            {
                UserId = targetUserId,
                CustomerName = dto.CustomerName,
                PhoneNumber = dto.PhoneNumber,
                ShippingAddress = fullAddress,
                TotalAmount = originalTotal,
                DiscountAmount = totalDiscount,
                DeliveryCharge = deliveryCharge,
                FinalAmount = finalAmount,
                Status = "Order Placed",
                PaymentMethod = dto.PaymentMethod,
                PaymentStatus = dto.PaymentMethod == "Cash on Delivery" ? "Pending" : "Completed",
                OrderDate = DateTime.UtcNow,
                OrderItems = orderItems
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Record payment details
            string txnId = !string.IsNullOrWhiteSpace(dto.TransactionId) 
                ? dto.TransactionId 
                : $"GKTXN{DateTime.UtcNow:yyyyMMddHHmmss}{new Random().Next(100, 999)}";

            var payment = new Payment
            {
                OrderId = order.Id,
                TransactionId = txnId,
                PaymentMethod = dto.PaymentMethod,
                Amount = finalAmount,
                Status = dto.PaymentMethod == "Cash on Delivery" ? "Pending" : "Success",
                PaymentDate = DateTime.UtcNow
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // Reload order with children for clean response
            var createdOrder = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payments)
                .FirstOrDefaultAsync(o => o.Id == order.Id);

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, createdOrder);
        }

        /// <summary>
        /// Simulation helper: Update order status
        /// PUT /api/orders/{id}/status
        /// Possible statuses: 'Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'
        /// </summary>
        [HttpPut("{id:int}/status")]
        public async Task<ActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto dto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound(new { message = $"Order with ID {id} not found." });
            }

            order.Status = dto.Status;
            if (dto.Status == "Delivered" && order.PaymentStatus == "Pending")
            {
                order.PaymentStatus = "Completed";
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = $"Order #{id} status updated to '{dto.Status}'." , currentStatus = order.Status });
        }
    }
}
