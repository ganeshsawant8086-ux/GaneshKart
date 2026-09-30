using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GaneshKart.API.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string MobileNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Pincode { get; set; } = string.Empty;

        [Required]
        [MaxLength(300)]
        public string AddressLine { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string State { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Landmark { get; set; }

        [MaxLength(20)]
        public string AddressType { get; set; } = "Home"; // Home or Work

        public bool IsDefault { get; set; } = false;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public User? User { get; set; }
    }
}
