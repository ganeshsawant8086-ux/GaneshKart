using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Models;

namespace GaneshKart.API.Data
{
    public class GaneshKartDbContext : DbContext
    {
        public GaneshKartDbContext(DbContextOptions<GaneshKartDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Wishlist> Wishlist { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure table names if needed
            modelBuilder.Entity<Category>().ToTable("Categories");
            modelBuilder.Entity<Product>().ToTable("Products");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Address>().ToTable("Addresses");
            modelBuilder.Entity<Cart>().ToTable("Cart");
            modelBuilder.Entity<CartItem>().ToTable("CartItems");
            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<OrderItem>().ToTable("OrderItems");
            modelBuilder.Entity<Payment>().ToTable("Payments");
            modelBuilder.Entity<Wishlist>().ToTable("Wishlist");

            // Define relations
            modelBuilder.Entity<Cart>()
                .HasMany(c => c.CartItems)
                .WithOne(ci => ci.Cart)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Product)
                .WithMany()
                .HasForeignKey(ci => ci.ProductId);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Payments)
                .WithOne(p => p.Order)
                .HasForeignKey(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Wishlist>()
                .HasOne(w => w.Product)
                .WithMany()
                .HasForeignKey(w => w.ProductId);

            modelBuilder.Entity<Address>()
                .HasOne(a => a.User)
                .WithMany(u => u.Addresses)
                .HasForeignKey(a => a.UserId);
        }
    }
}
