using Microsoft.EntityFrameworkCore;
using GaneshKart.API.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Add DbContext with SQL Server
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GaneshKartDbContext>(options =>
    options.UseSqlServer(connectionString));

// 2. Add Controllers with JSON configuration
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Avoid object cycle errors in nested entity relations
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// 3. Configure CORS for React Vite Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 4. Configure Swagger/OpenAPI documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.OpenApiInfo
    {
        Title = "GaneshKart Web API",
        Version = "v1",
        Description = "ASP.NET Core Web API for GaneshKart E-Commerce Platform"
    });
});

var app = builder.Build();

// 5. Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "GaneshKart API v1");
        c.RoutePrefix = "swagger";
    });
}

// Enable CORS
app.UseCors("AllowAll");

// Routing & Controller endpoints
app.UseAuthorization();
app.MapControllers();

app.Run();
