using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GaneshKart.API.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public List<CartItem> CartItems { get; set; } = new();

        [JsonIgnore]
        public User? User { get; set; }
    }

    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        public int CartId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; } = 1;

        public DateTime AddedDate { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Product? Product { get; set; }

        [JsonIgnore]
        public Cart? Cart { get; set; }
    }
}
