using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GaneshKart.API.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountAmount { get; set; } = 0;

        [Column(TypeName = "decimal(18,2)")]
        public decimal DeliveryCharge { get; set; } = 0;

        [Column(TypeName = "decimal(18,2)")]
        public decimal FinalAmount { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Order Placed"; // 'Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'

        [Required]
        [MaxLength(500)]
        public string ShippingAddress { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string PaymentMethod { get; set; } = "Cash on Delivery";

        [Required]
        [MaxLength(50)]
        public string PaymentStatus { get; set; } = "Pending";

        public List<OrderItem> OrderItems { get; set; } = new();

        public List<Payment> Payments { get; set; } = new();

        [JsonIgnore]
        public User? User { get; set; }
    }

    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        public int OrderId { get; set; }

        public int ProductId { get; set; }

        [Required]
        [MaxLength(250)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string ProductImageUrl { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; } = 1;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }
    }
}
