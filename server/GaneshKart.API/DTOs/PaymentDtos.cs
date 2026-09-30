using System.ComponentModel.DataAnnotations;

namespace GaneshKart.API.DTOs
{
    public class DummyPaymentRequestDto
    {
        public int? OrderId { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = string.Empty; // "UPI", "Credit Card", "Debit Card", "Cash on Delivery"

        [Range(1, 10000000)]
        public decimal Amount { get; set; }

        // UPI fields
        public string? UpiId { get; set; }

        // Card fields
        public string? CardNumber { get; set; }
        public string? CardHolderName { get; set; }
        public string? ExpiryDate { get; set; }
        public string? Cvv { get; set; }
    }

    public class DummyPaymentResponseDto
    {
        public bool Success { get; set; }
        public string TransactionId { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = "Success";
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
