using backend;
using backend.Data;
using backend.Interfaces;
using backend.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
	options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

//Services for database
builder.Services.AddDbContext<ApplicationDbContext>(options => 
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IRoutesRepository, RoutesRepository>();
builder.Services.AddScoped<ILocationsRepository, LocationsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x
 .AllowAnyMethod()
 .AllowAnyHeader()
 .WithOrigins("Put frontend URL here") // Remove final slash in the URL to avoid errors use the format "http://localhost:3000" instead of "http://localhost:3000/"
 .SetIsOriginAllowed(origin => true)
 );

app.MapControllers();


app.Seed();
app.Run();
