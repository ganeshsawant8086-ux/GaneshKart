using System.ComponentModel.DataAnnotations;

namespace GaneshKart.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Role { get; set; } = "Customer";

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Navigation
        public List<Address> Addresses { get; set; } = new();
    }
}
