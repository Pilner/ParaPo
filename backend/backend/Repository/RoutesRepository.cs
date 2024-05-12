using backend.Data;
using backend.Dtos.Location;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
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
			return await _context.Routes.Include(c => c.Locations).ToListAsync();
		}

		public async Task<Routes?> GetByIdAsync(int id)
		{
			return await _context.Routes.Include(c => c.Locations).FirstOrDefaultAsync(i => i.Id == id);
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
