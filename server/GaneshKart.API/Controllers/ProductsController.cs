using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public ProductsController(GaneshKartDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all products with optional filtering, search, and sorting
        /// GET /api/products?search=phone&category=Mobiles&minPrice=1000&maxPrice=100000&sortBy=priceAsc
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] string? search,
            [FromQuery] string? category,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? sortBy)
        {
            var query = _context.Products.AsQueryable();

            // Search by name or description or brand
            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(term) ||
                                         p.Description.ToLower().Contains(term) ||
                                         p.Brand.ToLower().Contains(term) ||
                                         p.Category.ToLower().Contains(term));
            }

            // Category filter
            if (!string.IsNullOrWhiteSpace(category) && !category.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(p => p.Category.ToLower() == category.Trim().ToLower());
            }

            // Price range filter
            if (minPrice.HasValue)
            {
                query = query.Where(p => p.DiscountPrice >= minPrice.Value);
            }
            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.DiscountPrice <= maxPrice.Value);
            }

            // Sorting
            query = sortBy switch
            {
                "priceAsc" => query.OrderBy(p => p.DiscountPrice),
                "priceDesc" => query.OrderByDescending(p => p.DiscountPrice),
                "rating" => query.OrderByDescending(p => p.Rating),
                "newest" => query.OrderByDescending(p => p.CreatedDate),
                _ => query.OrderByDescending(p => p.Id)
            };

            var products = await query.ToListAsync();
            return Ok(products);
        }

        /// <summary>
        /// Get featured products for the home page deals section
        /// GET /api/products/featured
        /// </summary>
        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<Product>>> GetFeaturedProducts()
        {
            var featured = await _context.Products
                .OrderByDescending(p => p.Rating)
                .Take(8)
                .ToListAsync();

            return Ok(featured);
        }

        /// <summary>
        /// Get a single product by Id
        /// GET /api/products/5
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {id} not found." });
            }
            return Ok(product);
        }

        /// <summary>
        /// Get products by category
        /// GET /api/products/category/Electronics
        /// </summary>
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string category)
        {
            var products = await _context.Products
                .Where(p => p.Category.ToLower() == category.Trim().ToLower())
                .ToListAsync();

            return Ok(products);
        }
    }
}
