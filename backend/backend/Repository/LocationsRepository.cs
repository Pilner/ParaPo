using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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

		public async Task<Locations> CreateAsync(Locations locationModel)
		{
			await _context.Locations.AddAsync(locationModel);
			await _context.SaveChangesAsync();
			return locationModel;
		}

		public async Task<Locations?> DeleteAllAsync(int RoutesId)
		{
			var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.RoutesId == RoutesId);
			if(locationModel == null) 
			{
				return null;
			}
			_context.Locations.Remove(locationModel);
			await _context.SaveChangesAsync();
			return locationModel;
		}

		public async Task<Locations?> DeleteAsync(int id)
		{
			var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);

			if(locationModel == null) 
			{
				return null;
			}

			_context.Locations.Remove(locationModel);
			await _context.SaveChangesAsync();
			return locationModel;
		}

		public async Task<List<Locations>> GetAllAsync()
		{
			return await _context.Locations.ToListAsync();
		}

		public async Task<Locations?> GetByIdAsync(int id)
		{
			return await _context.Locations.FindAsync(id);
		}

		public async Task<Locations?> UpdateAsync(int id, Locations locationModel)
		{
			var existingLocation = await _context.Locations.FindAsync(id);

			if (existingLocation == null) 
			{
				return null;
			}

			existingLocation.locationName = locationModel.locationName;
			existingLocation.Longitude = locationModel.Longitude;
			existingLocation.Latitude = locationModel.Latitude;

			await _context.SaveChangesAsync();
			return existingLocation;
		}
	}
}
