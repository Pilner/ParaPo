using backend;
using backend.Data;
using backend.Interfaces;
using backend.Repository;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(s =>
{
	s.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
	{
		Version = "V1",
		Title = "ParaPo API",
		Description = "API for Creating, Reading, Updating, and Deleting Locations and Routes in ParaPo Web Application",

	});
	var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
	var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
	s.IncludeXmlComments(xmlPath);
});


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
	app.UseSwaggerUI(c => 
	{
		c.SwaggerEndpoint("/swagger/v1/swagger.json", "ParaPo API");
		c.RoutePrefix = string.Empty;
		c.DefaultModelExpandDepth(2);
		c.DocExpansion(DocExpansion.None);
		c.DisplayRequestDuration();
	});
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
