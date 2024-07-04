using backend.Data;
using backend.Dtos.Location;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace backend.Repository
{
	// Code Repository for Routes -- All functions to be used in the Routes Controller
	public class RoutesRepository : IRoutesRepository
	{
		private readonly ApplicationDbContext _context;
        public RoutesRepository(ApplicationDbContext context)
        {
			_context = context;
        }

		public async Task<Routes> CreateAsync(Routes routesModel)
		{
			await _context.Routes.AddAsync(routesModel);
			await _context.SaveChangesAsync();
			return routesModel;
		}

		public async Task<Routes?> DeleteAsync(int id)
		{
			//Deletes everything including the relationships
			var routesModel = await _context.Routes.Include(c => c.Locations).FirstOrDefaultAsync(i => i.Id == id);

			if (routesModel == null) 
			{
				return null;
			}

			_context.Routes.Remove(routesModel);
			await _context.SaveChangesAsync();
			return routesModel;
		}

		public async Task<List<Routes>> GetAllAsync()
		{
			return await _context.Routes.Include(c => c.Locations).OrderBy(r => r.RouteName).ToListAsync();
		}

		public async Task<Routes?> GetByIdAsync(int id)
		{
			return await _context.Routes.Include(c => c.Locations).FirstOrDefaultAsync(i => i.Id == id);
		}

		public Task<bool> RoutesExists(int id)
		{
			return _context.Routes.AnyAsync(r => r.Id == id);
		}

		public async Task<List<Routes>> SearchRoutesAndLocationsAsync(string keyword)
		{
			var routes = await _context.Routes
				.Include(r => r.Locations)
				.ToListAsync();

			var filteredRoutes = routes
								.Where(r => r.RouteName.Contains(keyword, StringComparison.Ordinal) ||
								r.Locations.Any(l => l.locationName.Contains(keyword, StringComparison.OrdinalIgnoreCase)))
								.ToList();

			return filteredRoutes;
		}

		public async Task<Routes?> UpdateAsync(int id, UpdateRoutesRequestDto routesDto)
		{
			var existingRoutes = await _context.Routes.FirstOrDefaultAsync(x => x.Id == id);

			if (existingRoutes == null) 
			{
				return null;
			}
			existingRoutes.RouteName = routesDto.RouteName;
			existingRoutes.MinFare = routesDto.MinFare;

			await _context.SaveChangesAsync();
			return existingRoutes;
		}
	}
}

