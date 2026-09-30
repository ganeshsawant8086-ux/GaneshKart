using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;
using GaneshKart.API.Models;

namespace GaneshKart.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly GaneshKartDbContext _context;

        public CategoriesController(GaneshKartDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all active categories
        /// GET /api/categories
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories
                .Where(c => c.IsActive)
                .OrderBy(c => c.Id)
                .ToListAsync();

            return Ok(categories);
        }

        /// <summary>
        /// Get a single category by Id
        /// GET /api/categories/1
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound(new { message = $"Category with ID {id} not found." });
            }
            return Ok(category);
        }
    }
}
