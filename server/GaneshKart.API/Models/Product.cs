using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GaneshKart.API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(250)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountPrice { get; set; }

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Brand { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string ImageUrl { get; set; } = string.Empty;

        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; } = 4.0m;

        public int Stock { get; set; } = 10;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
