using System.ComponentModel.DataAnnotations;

namespace GaneshKart.API.DTOs
{
    public class AddToCartDto
    {
        [Required]
        public int ProductId { get; set; }

        [Range(1, 99)]
        public int Quantity { get; set; } = 1;
    }

    public class UpdateCartItemDto
    {
        [Range(1, 99)]
        public int Quantity { get; set; }
    }

    public class CartItemResponseDto
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ProductImageUrl { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalItemPrice => DiscountPrice * Quantity;
        public decimal TotalSavings => (Price - DiscountPrice) * Quantity;
    }

    public class CartSummaryResponseDto
    {
        public int CartId { get; set; }
        public int TotalItems { get; set; }
        public decimal OriginalTotal { get; set; }
        public decimal DiscountTotal { get; set; }
        public decimal TotalSavings { get; set; }
        public decimal DeliveryCharge { get; set; }
        public decimal FinalAmount { get; set; }
        public List<CartItemResponseDto> Items { get; set; } = new();
    }
}
