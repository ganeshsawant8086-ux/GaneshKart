using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.DTOs;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public PaymentsController(GaneshKartDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Process a simulated dummy payment (UPI, Credit Card, Debit Card, Cash on Delivery)
        /// POST /api/payments/dummy
        /// </summary>
        [HttpPost("dummy")]
        public async Task<ActionResult<DummyPaymentResponseDto>> ProcessDummyPayment([FromBody] DummyPaymentRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Input validation per payment method
            switch (request.PaymentMethod?.Trim())
            {
                case "UPI":
                    if (string.IsNullOrWhiteSpace(request.UpiId) || !request.UpiId.Contains('@'))
                    {
                        return BadRequest(new { message = "Please provide a valid UPI ID (e.g., user@okhdfcbank or 9876543210@paytm)." });
                    }
                    break;

                case "Credit Card":
                case "Debit Card":
                    var cleanCard = request.CardNumber?.Replace(" ", "").Replace("-", "");
                    if (string.IsNullOrWhiteSpace(cleanCard) || cleanCard.Length != 16 || !cleanCard.All(char.IsDigit))
                    {
                        return BadRequest(new { message = "Please enter a valid 16-digit card number." });
                    }
                    if (string.IsNullOrWhiteSpace(request.Cvv) || request.Cvv.Length < 3 || !request.Cvv.All(char.IsDigit))
                    {
                        return BadRequest(new { message = "Please enter a valid 3-digit CVV." });
                    }
                    if (string.IsNullOrWhiteSpace(request.ExpiryDate))
                    {
                        return BadRequest(new { message = "Please enter an expiry date (MM/YY)." });
                    }
                    break;

                case "Cash on Delivery":
                    // COD accepted directly
                    break;

                default:
                    return BadRequest(new { message = $"Unsupported payment method: {request.PaymentMethod}" });
            }

            // Generate realistic dummy Transaction ID formatted as requested
            // Example: GKTXN202609291234
            string timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmm");
            int randomSuffix = Random.Shared.Next(1000, 9999);
            string transactionId = $"GKTXN{timestamp}{randomSuffix}";

            // If an existing order was specified, update payment record
            if (request.OrderId.HasValue && request.OrderId.Value > 0)
            {
                var order = await _context.Orders.FindAsync(request.OrderId.Value);
                if (order != null)
                {
                    order.PaymentStatus = request.PaymentMethod == "Cash on Delivery" ? "Pending" : "Completed";
                    order.PaymentMethod = request.PaymentMethod;

                    var payment = new Payment
                    {
                        OrderId = order.Id,
                        TransactionId = transactionId,
                        PaymentMethod = request.PaymentMethod,
                        Amount = request.Amount > 0 ? request.Amount : order.FinalAmount,
                        Status = request.PaymentMethod == "Cash on Delivery" ? "Pending" : "Success",
                        PaymentDate = DateTime.UtcNow
                    };
                    _context.Payments.Add(payment);
                    await _context.SaveChangesAsync();
                }
            }

            var response = new DummyPaymentResponseDto
            {
                Success = true,
                TransactionId = transactionId,
                PaymentMethod = request.PaymentMethod,
                Amount = request.Amount,
                Status = "Success",
                Message = request.PaymentMethod == "Cash on Delivery"
                    ? "Order confirmed with Cash on Delivery. Pay upon arrival."
                    : "Simulated payment successfully processed via GaneshKart Dummy Gateway.",
                Timestamp = DateTime.UtcNow
            };

            return Ok(response);
        }

        /// <summary>
        /// Retrieve payment details by Transaction ID
        /// GET /api/payments/{transactionId}
        /// </summary>
        [HttpGet("{transactionId}")]
        public async Task<ActionResult<Payment>> GetPaymentByTransactionId(string transactionId)
        {
            var payment = await _context.Payments
                .Include(p => p.Order)
                .FirstOrDefaultAsync(p => p.TransactionId == transactionId);

            if (payment == null)
            {
                return NotFound(new { message = $"Transaction {transactionId} not found." });
            }

            return Ok(payment);
        }
    }
}
