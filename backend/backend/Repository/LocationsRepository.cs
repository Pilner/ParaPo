using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
	public class LocationsRepository : ILocationsRepository
	{
		private readonly ApplicationDbContext _context;
        public LocationsRepository(ApplicationDbContext context)
        {
			_context = context;
        }
        public async Task<List<Locations>> GetAllAsync()
		{
			return await _context.Locations.ToListAsync();
		}

		public async Task<Locations?> GetByIdAsync(int id)
		{
			return await _context.Locations.FindAsync(id);
		}
	}
}
