using backend.Dtos.Location;
using backend.Models;

namespace backend.Interfaces
{
	public interface IRoutesRepository
	{
		Task<List<Routes>> GetAllAsync();

		Task<Routes?> GetByIdAsync(int id); //FirstOrDefault can be NULL

		Task<Routes> CreateAsync(Routes routesModel);

		Task<Routes?> UpdateAsync(int id, UpdateRoutesRequestDto routesDto);
		Task<Routes?> DeleteAsync(int id);

		Task<bool> RoutesExists(int id);
	}
}
