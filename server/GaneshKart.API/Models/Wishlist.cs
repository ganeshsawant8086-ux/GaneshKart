using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GaneshKart.API.Models
{
    public class Wishlist
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        public DateTime AddedDate { get; set; } = DateTime.UtcNow;

        // Navigation
        public Product? Product { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
