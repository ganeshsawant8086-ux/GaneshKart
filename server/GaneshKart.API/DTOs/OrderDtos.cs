using System.ComponentModel.DataAnnotations;

namespace GaneshKart.API.DTOs
{
    public class CreateOrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ProductImageUrl { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
    }

    public class CreateOrderDto
    {
        [Required]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string ShippingAddress { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;

        [Required]
        public string State { get; set; } = string.Empty;

        [Required]
        public string Pincode { get; set; } = string.Empty;

        [Required]
        public string PaymentMethod { get; set; } = "Cash on Delivery"; // UPI, Credit Card, Debit Card, Cash on Delivery

        public string? TransactionId { get; set; }

        public List<CreateOrderItemDto>? DirectItems { get; set; } // If buy-now directly without cart
    }

    public class UpdateOrderStatusDto
    {
        [Required]
        public string Status { get; set; } = "Confirmed"; // 'Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'
    }
}
