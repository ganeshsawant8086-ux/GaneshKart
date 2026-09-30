using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GaneshKart.API.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        public int OrderId { get; set; }

        [Required]
        [MaxLength(100)]
        public string TransactionId { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string PaymentMethod { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Success";

        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public Order? Order { get; set; }
    }
}
