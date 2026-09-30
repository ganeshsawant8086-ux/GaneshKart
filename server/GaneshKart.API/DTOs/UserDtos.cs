using System.ComponentModel.DataAnnotations;

namespace GaneshKart.API.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterDto
    {
        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
    }

    public class UserResponseDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Role { get; set; } = "Customer";
    }

    public class CreateAddressDto
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string MobileNumber { get; set; } = string.Empty;

        [Required]
        public string Pincode { get; set; } = string.Empty;

        [Required]
        public string AddressLine { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;

        [Required]
        public string State { get; set; } = string.Empty;

        public string? Landmark { get; set; }

        public string AddressType { get; set; } = "Home";

        public bool IsDefault { get; set; } = false;
    }
}
