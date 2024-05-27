using backend.Models;

namespace backend.Interfaces
{
	public interface ILocationsRepository
	{
		Task<List<Locations>> GetAllAsync();

		Task<Locations?> GetByIdAsync(int id);

		Task<Locations> CreateAsync(Locations locationModel);

		Task<Locations?> UpdateAsync(int id, Locations locationModel);

		Task<Locations?> DeleteAsync(int id);

		Task<Locations?> DeleteAllAsync(int id);

	}
}
