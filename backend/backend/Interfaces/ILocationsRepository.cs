using backend.Models;

namespace backend.Interfaces
{
	public interface ILocationsRepository
	{
		Task<List<Locations>> GetAllAsync();

		Task<Locations?> GetByIdAsync(int id);
	}
}
